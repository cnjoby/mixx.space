import { siteConfig } from '@/lib/config'
import SocialButton from '@/themes/fukasawa/components/SocialButton'
import { Logo } from './Logo'
import { SVGFooterCircleBG } from './svg/SVGFooterCircleBG'
import SmartLink from '@/components/SmartLink'

/* eslint-disable @next/next/no-img-element */
export const Footer = props => {
  const STARTER_FOOTER_LINK_GROUP = siteConfig('STARTER_FOOTER_LINK_GROUP', [])
    // 微信二维码配置
  const wechatQRCodes = [
    {
      title: '关注微信公众号',
      image: '/images/starter/footer/wechat-official.png', // 请替换为实际的公众号二维码图片路径
    },
    {
      title: '关注微信视频号',
      image: '/images/starter/footer/wechat-video.png', // 请替换为实际的视频号二维码图片路径
    }
  ]
  return (
    <>
      {/* <!-- ====== Footer Section Start --> */}
      <footer
        className='wow fadeInUp relative z-10 bg-[#090E34] pt-20 lg:pt-[100px]'
        data-wow-delay='.15s'>
        <div className='container'>
          <div className='-mx-4 flex flex-wrap'>
            
            {/* Logo和介绍区域 - 对称布局调整 */}
            <div className='w-full px-4 sm:w-full md:w-1/2 lg:w-1/4 xl:w-1/4'>
              <div className='mb-10 w-full'>
                <a className='-mx-4 mb-6 inline-block max-w-[160px]'>
                  <Logo white={true} />
                </a>
                <p className='mb-8 max-w-[280px] text-base leading-relaxed text-gray-7'>
                  {siteConfig('STARTER_FOOTER_SLOGAN')}
                </p>
                <div className='-mx-3 flex items-center'>
                  <div className='mx-3'>
                    <SocialButton />
                  </div>
                </div>
              </div>
            </div>

            {/* 两列链接组 - 对称布局 */}
            {STARTER_FOOTER_LINK_GROUP?.map((item, index) => {
              return (
                <div
                  key={index}
                  className='w-full px-4 sm:w-1/2 md:w-1/4 lg:w-1/4 xl:w-1/4'>
                  <div className='mb-10 w-full'>
                    <h4 className='mb-9 text-lg font-semibold text-white'>
                      {item.TITLE}
                    </h4>
                    <ul>
                      {item?.LINK_GROUP?.map((l, i) => {
                        return (
                          <li key={i}>
                            <SmartLink
                              href={l.URL}
                              className='mb-3 inline-block text-base leading-loose text-gray-7 transition hover:text-primary'>
                              {l.TITLE}
                            </SmartLink>
                          </li>
                        )
                      })}
                    </ul>
                  </div>
                </div>
              )
            })}

            {/* 微信二维码区域 - 响应式横向/纵向布局 */}
            <div className='w-full px-4 sm:w-full md:w-1/2 lg:w-1/4 xl:w-1/4'>
              <div className='mb-10 w-full'>
                <h4 className='mb-9 text-lg font-semibold text-white'>
                  关注我们
                </h4>
                
                {/* 桌面端横向排列，移动端纵向排列 */}
                <div className='flex flex-col gap-8 sm:flex-col md:flex-col lg:flex-row lg:gap-4 xl:flex-row xl:gap-6'>
                  {wechatQRCodes.map((qrcode, index) => (
                    <div key={index} className='flex-1 text-center'>
                      <div className='mb-3 flex justify-center'>
                        <div className='overflow-hidden rounded-lg border-2 border-gray-600 transition-all duration-300 hover:border-gray-400'>
                          <img
                            src={qrcode.image}
                            alt={qrcode.title}
                            className='h-20 w-20 object-cover lg:h-16 lg:w-16 xl:h-20 xl:w-20'
                          />
                        </div>
                      </div>
                      <h5 className='mb-1 text-xs font-medium text-white lg:text-xs xl:text-sm'>
                        {qrcode.title}
                      </h5>
                      <p className='text-xs leading-relaxed text-gray-7 lg:text-xs'>
                        {qrcode.description}
                      </p>
                    </div>
                  ))}
                </div>
                
                {/* 底部提示文字 */}
                <p className='mt-4 text-center text-xs text-gray-7 lg:text-xs'>
                  扫码获取更多资讯
                </p>
              </div>
            </div>

          </div>
        </div>

        {/* 底部版权信息相关 */}
        <div className='mt-12 border-t border-[#8890A4] border-opacity-40 py-8 lg:mt-[60px]'>
          <div className='container'>
            <div className='-mx-4 flex flex-wrap'>
              <div className='w-full px-4 md:w-2/3 lg:w-1/2'>
                <div className='my-1'>
                  <div className='-mx-3 flex flex-wrap items-center justify-center md:justify-start'>
                    {siteConfig('STARTER_FOOTER_PRIVACY_POLICY_TEXT') && (
                      <SmartLink
                        href={siteConfig('STARTER_FOOTER_PRIVACY_POLICY_URL', '')}
                        className='px-3 py-1 text-base text-gray-7 transition hover:text-white hover:underline'>
                        {siteConfig('STARTER_FOOTER_PRIVACY_POLICY_TEXT')}
                      </SmartLink>
                    )}
                    {siteConfig('STARTER_FOOTER_PRIVACY_LEGAL_NOTICE_TEXT') && (
                      <SmartLink
                        href={siteConfig('STARTER_FOOTER_PRIVACY_LEGAL_NOTICE_URL', '')}
                        className='px-3 py-1 text-base text-gray-7 transition hover:text-white hover:underline'>
                        {siteConfig('STARTER_FOOTER_PRIVACY_LEGAL_NOTICE_TEXT')}
                      </SmartLink>
                    )}
                    {siteConfig('STARTER_FOOTER_PRIVACY_TERMS_OF_SERVICE_TEXT') && (
                      <SmartLink
                        href={siteConfig('STARTER_FOOTER_PRIVACY_TERMS_OF_SERVICE_URL', '')}
                        className='px-3 py-1 text-base text-gray-7 transition hover:text-white hover:underline'>
                        {siteConfig('STARTER_FOOTER_PRIVACY_TERMS_OF_SERVICE_TEXT')}
                      </SmartLink>
                    )}
                  </div>
                </div>
              </div>
              <div className='w-full px-4 md:w-1/3 lg:w-1/2'>
                <div className='my-1 flex justify-center md:justify-end'>
                  <p className='text-base text-gray-7'>
                    Designed and Developed by
                    <a
                      href='https://github.com/tangly1024/NotionNext'
                      rel='nofollow noopener noreferrer'
                      target='_blank'
                      className='px-1 text-gray-1 transition hover:underline'>
                      NotionNext {siteConfig('VERSION')}
                    </a>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer 背景 */}
        <div>
          <span className='absolute left-0 top-0 z-[-1]'>
            <img src='/images/starter/footer/shape-1.svg' alt='' />
          </span>

          <span className='absolute bottom-0 right-0 z-[-1]'>
            <img src='/images/starter/footer/shape-3.svg' alt='' />
          </span>

          <span className='absolute right-0 top-0 z-[-1]'>
            <SVGFooterCircleBG />
          </span>
        </div>
      </footer>
      {/* <!-- ====== Footer Section End --> */}
    </>
  )
}
