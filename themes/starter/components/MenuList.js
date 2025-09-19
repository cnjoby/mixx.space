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
  
  const [showMenu, setShowMenu] = useState(false) // 主菜单显示状态
  const [activeSubMenu, setActiveSubMenu] = useState(null) // 当前激活的子菜单ID
  const menuRef = useRef(null)
  const toggleButtonRef = useRef(null)

  // 为菜单项添加唯一ID
  let links = [
    {
      id: 'archive',
      icon: 'fas fa-archive',
      name: locale.NAV.ARCHIVE,
      href: '/archive',
      show: siteConfig('HEO_MENU_ARCHIVE')
    },
    {
      id: 'search',
      icon: 'fas fa-search',
      name: locale.NAV.SEARCH,
      href: '/search',
      show: siteConfig('HEO_MENU_SEARCH')
    },
    {
      id: 'category',
      icon: 'fas fa-folder',
      name: locale.COMMON.CATEGORY,
      href: '/category',
      show: siteConfig('HEO_MENU_CATEGORY')
    },
    {
      id: 'tag',
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

  // 关闭所有菜单
  const closeAllMenus = useCallback(() => {
    setShowMenu(false)
    setActiveSubMenu(null)
  }, [])

  // 外部点击检测
  const handleOutsideClick = useCallback((event) => {
    if (
      menuRef.current && 
      !menuRef.current.contains(event.target) &&
      toggleButtonRef.current && 
      !toggleButtonRef.current.contains(event.target)
    ) {
      closeAllMenus()
    }
  }, [closeAllMenus])

  // 滚动事件检测 - 解决问题4
  const handleScroll = useCallback(() => {
    closeAllMenus()
  }, [closeAllMenus])

  // 键盘事件检测
  const handleKeyDown = useCallback((event) => {
    if (event.key === 'Escape') {
      closeAllMenus()
    }
  }, [closeAllMenus])

  // 主菜单切换
  const toggleMenu = (event) => {
    event.stopPropagation()
    setShowMenu(!showMenu)
    setActiveSubMenu(null) // 打开主菜单时清除子菜单状态
  }

  // 子菜单状态管理 - 解决问题5（单一激活模式）
  const handleSubMenuToggle = useCallback((menuId) => {
    setActiveSubMenu(current => current === menuId ? null : menuId)
  }, [])

  // 导航处理 - 解决问题2
  const handleNavigation = useCallback(() => {
    closeAllMenus()
  }, [closeAllMenus])

  // 路由变化时关闭所有菜单
  useEffect(() => {
    closeAllMenus()
  }, [router.pathname, closeAllMenus])

  // 事件监听器管理 - 解决问题3和4
  useEffect(() => {
    if (showMenu || activeSubMenu) {
      const timer = setTimeout(() => {
        document.addEventListener('mousedown', handleOutsideClick, true)
        document.addEventListener('scroll', handleScroll, true) // 页面滚动
        document.addEventListener('keydown', handleKeyDown)
        window.addEventListener('scroll', handleScroll, true) // 窗口滚动
      }, 0)
      
      return () => {
        clearTimeout(timer)
        document.removeEventListener('mousedown', handleOutsideClick, true)
        document.removeEventListener('scroll', handleScroll, true)
        document.removeEventListener('keydown', handleKeyDown)
        window.removeEventListener('scroll', handleScroll, true)
      }
    }
  }, [showMenu, activeSubMenu, handleOutsideClick, handleScroll, handleKeyDown])

  if (!links || links.length === 0) {
    return null
  }

  return (
    <div className="relative">
      {/* 汉堡菜单按钮 */}
      <button
        ref={toggleButtonRef}
        id='navbarToggler'
        onClick={toggleMenu}
        aria-expanded={showMenu}
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

      {/* 背景遮罩 */}
      {showMenu && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-30 lg:hidden"
          onClick={closeAllMenus}
        />
      )}

      <nav
        ref={menuRef}
        id='navbarCollapse'
        className={`absolute right-4 top-full w-full max-w-[250px] rounded-lg bg-white py-5 shadow-lg dark:bg-dark-2 z-40 lg:static lg:block lg:w-full lg:max-w-full lg:bg-transparent lg:px-4 lg:py-0 lg:shadow-none lg:z-auto dark:lg:bg-transparent xl:px-6 ${
          showMenu ? '' : 'hidden'
        }`}>
        <ul className='block lg:flex 2xl:ml-20'>
          {links?.map((link, index) => (
            <MenuItem 
              key={link.id || index}
              link={{...link, id: link.id || index}}
              isSubMenuOpen={activeSubMenu === (link.id || index)}
              onSubMenuToggle={() => handleSubMenuToggle(link.id || index)}
              onNavigation={handleNavigation}
            />
          ))}
        </ul>
      </nav>
    </div>
  )
}
