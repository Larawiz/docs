/**
 * @type {import('vitepress').UserConfig}
 */
import {defineConfig} from 'vitepress'

export default defineConfig({
    base: '/docs/',
    title: 'Larawiz Documentation',
    description: 'Learn how quick and easy you can scaffold your own Laravel app.',
    head: [
        ['link', {rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: ''}]
    ],

    lang: 'en-US',
    markdown: {
        lineNumbers: true
    },
    themeConfig: {
        logo: '/logo.svg',
        sidebar: [
            {
                items: [
                    {text: "Example", link: "/example"},
                    {text: "Model", link: "/model"},
                ]
            },
            {
                text: "Model Columns",
                collapsible: true,
                collapsed: false,
                items: [
                    {text: "Columns", link: "/model-columns/"},
                    {text: "Primary key", link: "/model-columns/primary-key"},
                    {text: "Indexes", link: "/model-columns/indexes"},
                    {text: "Soft-deletes", link: "/model-columns/soft-deletes"},
                    {text: "Timestamps", link: "/model-columns/timestamps"},
                ]
            },
            {
                text: "Model Relations",
                collapsible: true,
                collapsed: true,
                items: [
                    {text: "Relations", link: "/model-relations/"},
                    {text: "Has One or Many", link: "/model-relations/has-one-or-many"},
                    {text: "Has One or Many Through", link: "/model-relations/has-one-or-many-through"},
                    {text: "Polymorphic Has One or Many", link: "/model-relations/polymorphic-has-one-or-many"},
                    {text: "Many to Many and Polymorphic", link: "/model-relations/many-to-many-and-polymorphic"},
                    {text: "Pivot Models", link: "/model-relations/pivot-models"},
                ]
            },
            {
                text: "Model Properties",
                collapsible: true,
                collapsed: true,
                items: [
                    {text: "Table name", link: "/model-properties/table"},
                    {text: "Fillable", link: "/model-properties/fillable"},
                    {text: "Hidden", link: "/model-properties/hidden"},
                    {text: "Traits", link: "/model-properties/traits"},
                    {text: "Casts", link: "/model-properties/casts"},
                    {text: "Users", link: "/model-properties/users"},
                    {text: "Factories", link: "/model-properties/factories"},
                    {text: "Seeders", link: "/model-properties/seeders"},
                    {text: "Scopes", link: "/model-properties/scopes"},
                    {text: "Appends", link: "/model-properties/appends"},
                    {text: "Observers", link: "/model-properties/observers"},
                ]
            },
            {
                items: [
                    {text: "Migrations", link: "/migrations"},
                ]
            },
            {
                items: [
                    {text: "Scaffolding", link: "/scaffold"}
                ]
            }
        ],
        socialLinks: [
            {icon: 'github', link: 'https://github.com/larawiz/'},
        ],
        nav: [
            {text: `⬅ Back to scaffold`, link: 'https://larawiz.com'},
            {
                text: 'You like it? Donate!',
                items: [
                    {text: 'Github Sponsorship', link: 'https://github.com/sponsors/DarkGhostHunter'},
                    {text: 'Patreon', link: 'https://patreon.com/packagesforlaravel'},
                    {text: 'Ko-fi', link: 'https://ko-fi.com/DarkGhostHunter'},
                    {text: 'Buy me a coffee', link: 'https://www.buymeacoffee.com/darkghosthunter'},
                    {text: 'Paypal', link: 'https://www.paypal.com/paypalme/darkghosthunter'},
                ]
            }
        ],
        editLink: {
            pattern: 'https://github.com/larawiz/docs/edit/main/docs/:path',
            text: 'Something not right? Propose a change on GitHub'
        },
        footer: {
            copyright: "Laravel is a Trademark of Taylor Otwell. Copyright © 2011-2022 Laravel LLC."
        }
    }
})