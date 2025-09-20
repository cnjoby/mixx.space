export const MenuList = props => {
  // ... 保持其他状态和逻辑不变

  return (
    <>
      {/* 移动端汉堡菜单按钮 - 使用fixed定位确保正确位置 */}
      <button
        ref={toggleButtonRef}
        id='navbarToggler'
        onClick={toggleMenu}
        aria-expanded={showMenu}
        aria-label="Toggle navigation menu"
        className={`
          fixed lg:hidden
          top-4 right-4
          z-50
          w-10 h-10
          flex flex-col justify-center items-center
          rounded-lg
          bg-black bg-opacity-20
          hover:bg-opacity-30
          focus:outline-none focus:ring-2 focus:ring-white
          transition-all duration-300
          ${showMenu ? 'navbarTogglerActive' : ''}
        `}>
        
        {/* 改进的汉堡图标动画 */}
        <span className={`
          block w-6 h-0.5 bg-white rounded-full
          transition-all duration-300 transform origin-center
          ${showMenu ? 'rotate-45 translate-y-0.5' : 'mb-1'}
        `}></span>
        <span className={`
          block w-6 h-0.5 bg-white rounded-full
          transition-all duration-300
          ${showMenu ? 'opacity-0' : ''}
        `}></span>
        <span className={`
          block w-6 h-0.5 bg-white rounded-full
          transition-all duration-300 transform origin-center
          ${showMenu ? '-rotate-45 -translate-y-0.5' : 'mt-1'}
        `}></span>
      </button>

      {/* 全屏背景遮罩 */}
      {showMenu && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={closeAllMenus}
        />
      )}

      {/* 移动端滑入菜单 */}
      <nav
        ref={menuRef}
        id='navbarCollapse'
        className={`
          fixed lg:static
          top-0 right-0
          w-80 lg:w-full
          h-full lg:h-auto
          max-w-full
          bg-white dark:bg-dark-2
          lg:bg-transparent dark:lg:bg-transparent
          shadow-2xl lg:shadow-none
          z-40 lg:z-auto
          transform transition-transform duration-300 ease-in-out
          lg:transform-none
          overflow-y-auto lg:overflow-visible
          ${showMenu 
            ? 'translate-x-0' 
            : 'translate-x-full lg:translate-x-0'
          }
        `}>
        
        {/* 移动端菜单内容 */}
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
