import { defineConfig } from 'vitepress'
// https://vitepress.dev/reference/site-config
export default defineConfig({
  // base: '/knowledgeBase-vitepress/',
  head: [["link", { rel: "icon", href: "../public/logo.svg" }]], // 
  title: "Json Yu个人知识库",
  description: "Personal knowledge base",
  themeConfig: {
    logo: '/public/logo.svg',
    outlineTitle: "目录", // 右侧导航栏顶部显示内容
    outline: [2, 6], // 右侧导航栏默认是md的文件一二级标题，加上这个可以显示最多显示6级标题
    // https://vitepress.dev/reference/default-theme-config
    // 设置搜索框的样式
    search: {
      provider: "local",
      options: {
        translations: {
          button: {
            buttonText: "搜索文档",
            buttonAriaLabel: "搜索文档",
          },
          modal: {
            noResultsText: "无法找到相关结果",
            resetButtonTitle: "清除查询条件",
            footer: {
              selectText: "选择",
              navigateText: "切换",
            },
          },
        },
      },
    },
    nav: [
      { text: '家', link: '/' },
      { text: '示例', link: '/react/index' }
    ],

    sidebar: [
      {
        text: 'Vue',
        items: [
          { text: 'Vue是什么', link: '/vue/index' },
          { text: 'Vue-Router', link: '/vue/vue-router' }
        ]
      },
      {
        text: 'React',
        items: [
          { text: 'Markdown 示例1', link: '/react/markdown-examples' },
          { text: 'API 示例1', link: '/react/api-examples' },
          {text: 'index', link: '/react/index.md'}
        ]
      }
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/curryandfish' },
      {
        icon: {
          svg: '<svg t="1714008129091" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1852" width="256" height="256"><path d="M512 1024C229.222 1024 0 794.778 0 512S229.222 0 512 0s512 229.222 512 512-229.222 512-512 512z m259.149-568.883h-290.74a25.293 25.293 0 0 0-25.292 25.293l-0.026 63.206c0 13.952 11.315 25.293 25.267 25.293h177.024c13.978 0 25.293 11.315 25.293 25.267v12.646a75.853 75.853 0 0 1-75.853 75.853h-240.23a25.293 25.293 0 0 1-25.267-25.293V417.203a75.853 75.853 0 0 1 75.827-75.853h353.946a25.293 25.293 0 0 0 25.267-25.292l0.077-63.207a25.293 25.293 0 0 0-25.268-25.293H417.152a189.62 189.62 0 0 0-189.62 189.645V771.15c0 13.977 11.316 25.293 25.294 25.293h372.94a170.65 170.65 0 0 0 170.65-170.65V480.384a25.293 25.293 0 0 0-25.293-25.267z" fill="#C71D23" p-id="1853"></path></svg>'
        }, link: "https://gitee.com/yu021214"
      }
    ],
    footer: {
      message: "Json Yu个人知识库",
      copyright: "© 豫IP备2024057248号"
    }
  }
})
