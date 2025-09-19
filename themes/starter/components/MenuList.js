import BLOG from '@/blog.config'
import { siteConfig } from '@/lib/config'
import { useGlobal } from '@/lib/global'
import { useRouter } from 'next/router'
import { useEffect, useState, useRef, useCallback } from 'react'
import { MenuItem } from './MenuItem'

export const MenuList = props => {
  const { customNav, customMenu } = props
  const { locale } = useGlobal()
  const router = useRouter()
  
  const [showMenu, setShowMenu] = useState(false)
  const menuRef = useRef(null)
  const toggleButtonRef = useRef(null)

  // 菜单配置保持不变
  let links = [
    {
      icon: 'fas fa-archive',
      name: locale.NAV.ARCHIVE,
      href: '/archive',
      show: siteConfig('HEO_MENU_ARCHIVE')
    },
    {
      icon: 'fas fa-search',
      name: locale.NAV.SEARCH,
      href: '/search',
      show: siteConfig('HEO_MENU_SEARCH')
    },
    {
      icon: 'fas fa-folder',
      name: locale.COMMON.CATEGORY,
      href: '/category',
      show: siteConfig('HEO_MENU_CATEGORY')
    },
    {
      icon: 'fas fa-tag',
      name: locale.COMMON.TAGS,
      href: '/tag',
      show: siteConfig('HEO_MENU_TAG')
    }
  ]

  if (customNav) {
    links = customNav.concat(links)
  }

  if (siteConfig('CUSTOM_MENU', BLOG.CUSTOM_MENU)) {
    links = customMenu
  }

  // 外部点击关闭菜单
  const handleOutsideClick = useCallback((event) => {
    if (
      menuRef.current && 
      !menuRef.current.contains(event.target) &&
      toggleButtonRef.current && 
      !toggleButtonRef.current.contains(event.target)
    ) {
      setShowMenu(false)
    }
  }, [])

  // ESC键关闭菜单
  const handleKeyDown = useCallback((event) => {
    if (event.key === 'Escape' && showMenu) {
      setShowMenu(false)
    }
  }, [showMenu])

  const toggleMenu = (event) => {
    event.stopPropagation()
    setShowMenu(!showMenu)
  }

  // 路由变化时关闭菜单（保持原有功能）
  useEffect(() => {
    setShowMenu(false)
  }, [router])

  // 添加事件监听器
  useEffect(() => {
    if (showMenu) {
      document.addEventListener('mousedown', handleOutsideClick)
      document.addEventListener('keydown', handleKeyDown)
      document.addEventListener('focusin', handleOutsideClick)
      
      return () => {
        document.removeEventListener('mousedown', handleOutsideClick)
        document.removeEventListener('keydown', handleKeyDown)
        document.removeEventListener('focusin', handleOutsideClick)
      }
    }
  }, [showMenu, handleOutsideClick, handleKeyDown])

  if (!links || links.length === 0) {
    return null
  }

  return (
    <div className="relative">
      {/* 汉堡菜单按钮 - 添加动画效果 */}
      <button
        ref={toggleButtonRef}
        id='navbarToggler'
        onClick={toggleMenu}
        aria-expanded={showMenu}
        aria-controls="navbarCollapse"
        aria-label="Toggle navigation menu"
        className={`absolute right-4 top-1/2 block -translate-y-1/2 rounded-lg px-3 py-[6px] ring-primary focus:ring-2 lg:hidden transition-all duration-300 ${
          showMenu ? 'navbarTogglerActive' : ''
        }`}>
        <span className={`relative my-[6px] block h-[2px] w-[30px] bg-white duration-300 transition-all ${
          showMenu ? 'rotate-45 translate-y-[8px]' : ''
        }`}></span>
        <span className={`relative my-[6px] block h-[2px] w-[30px] bg-white duration-300 transition-all ${
          showMenu ? 'opacity-0' : ''
        }`}></span>
        <span className={`relative my-[6px] block h-[2px] w-[30px] bg-white duration-300 transition-all ${
          showMenu ? '-rotate-45 -translate-y-[8px]' : ''
        }`}></span>
      </button>

      {/* 背景遮罩层（移动端） */}
      {showMenu && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-30 lg:hidden"
          onClick={() => setShowMenu(false)}
          aria-hidden="true"
        />
      )}

      <nav
        ref={menuRef}
        id='navbarCollapse'
        role="navigation"
        className={`absolute right-4 top-full w-full max-w-[250px] rounded-lg bg-white py-5 shadow-lg dark:bg-dark-2 z-40 transition-all duration-300 lg:static lg:block lg:w-full lg:max-w-full lg:bg-transparent lg:px-4 lg:py-0 lg:shadow-none lg:z-auto dark:lg:bg-transparent xl:px-6 ${
          showMenu ? 'block opacity-100 translate-y-0' : 'hidden opacity-0 -translate-y-2'
        } lg:opacity-100 lg:translate-y-0`}>
        <ul className='block lg:flex 2xl:ml-20'>
          {links?.map((link, index) => (
            <MenuItem key={index} link={link} />
          ))}
        </ul>
      </nav>
    </div>
  )
}
