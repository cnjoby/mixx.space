import { useEffect, useRef, useState } from 'react'
import { useRouter } from 'next/router'
import { MenuItem } from './MenuItem'

export const MenuList = props => {
  const { links = [] } = props
  const [showMenu, setShowMenu] = useState(false)
  const [activeSubMenu, setActiveSubMenu] = useState(null)
  const toggleButtonRef = useRef(null)
  const menuRef = useRef(null)
  const router = useRouter()

  // 切换菜单显示状态
  const toggleMenu = () => {
    setShowMenu(!showMenu)
  }

  // 关闭所有菜单
  const closeAllMenus = () => {
    setShowMenu(false)
    setActiveSubMenu(null)
  }

  // 处理子菜单切换
  const handleSubMenuToggle = (id) => {
    setActiveSubMenu(activeSubMenu === id ? null : id)
  }

  // 处理导航
  const handleNavigation = () => {
    closeAllMenus()
  }

  // 点击外部关闭菜单
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        showMenu &&
        menuRef.current &&
        !menuRef.current.contains(event.target) &&
        toggleButtonRef.current &&
        !toggleButtonRef.current.contains(event.target)
      ) {
        closeAllMenus()
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [showMenu])

  // 路由变化时关闭菜单
  useEffect(() => {
    const handleRouteChange = () => {
      closeAllMenus()
    }

    router.events.on('routeChangeComplete', handleRouteChange)
    return () => {
      router.events.off('routeChangeComplete', handleRouteChange)
    }
  }, [router.events])

  return (
    <>
      {/* 移动端汉堡菜单按钮 - 简化类名格式 */}
      <button
        ref={toggleButtonRef}
        id='navbarToggler'
        onClick={toggleMenu}
        aria-expanded={showMenu}
        aria-label="Toggle navigation menu"
        className={`fixed lg:hidden top-4 right-4 z-50 w-10 h-10 flex flex-col justify-center items-center rounded-lg bg-black bg-opacity-20 hover:bg-opacity-30 focus:outline-none focus:ring-2 focus:ring-white transition-all duration-300 ${showMenu ? 'navbarTogglerActive' : ''}`}
        style={{ right: '1rem', left: 'auto' }}>
        
        {/* 简化的汉堡图标 */}
        <span className={`block w-6 h-0.5 bg-white rounded-full transition-all duration-300 transform origin-center ${showMenu ? 'rotate-45 translate-y-0.5' : 'mb-1'}`}></span>
        <span className={`block w-6 h-0.5 bg-white rounded-full transition-all duration-300 ${showMenu ? 'opacity-0' : ''}`}></span>
        <span className={`block w-6 h-0.5 bg-white rounded-full transition-all duration-300 transform origin-center ${showMenu ? '-rotate-45 -translate-y-0.5' : 'mt-1'}`}></span>
      </button>

      {/* 背景遮罩 */}
      {showMenu && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={closeAllMenus}
        />
      )}

      {/* 移动端菜单 - 简化类名 */}
      <nav
        ref={menuRef}
        id='navbarCollapse'
        className={`fixed lg:static top-0 right-0 w-80 lg:w-full h-full lg:h-auto max-w-full bg-white dark:bg-dark-2 lg:bg-transparent dark:lg:bg-transparent shadow-2xl lg:shadow-none z-40 lg:z-auto transform transition-transform duration-300 ease-in-out lg:transform-none overflow-y-auto lg:overflow-visible ${showMenu ? 'translate-x-0' : 'translate-x-full lg:translate-x-0'}`}>
        
        <div className="pt-16 px-6 pb-6 lg:p-0">
          <ul className='flex flex-col lg:flex-row space-y-4 lg:space-y-0 lg:space-x-6 2xl:ml-20'>
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
        </div>
      </nav>
    </>
  )
}
