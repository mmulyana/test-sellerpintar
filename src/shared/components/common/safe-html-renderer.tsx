import parse, { DOMNode, domToReact, Element } from 'html-react-parser'
import { codeToHtml } from 'shiki'

type props = {
	htmlContent: string
}

export async function SafeHtmlRenderer({ htmlContent }: props) {
	const codeBlockRegex =
		/<pre><code class="language-(\w+)">([\s\S]*?)<\/code><\/pre>/g
	const matches = Array.from(htmlContent.matchAll(codeBlockRegex))

	const highlightedSnippets = await Promise.all(
		matches.map(async (match) => {
			const [, lang, code] = match
			const decodedCode = code.replace(/&lt;/g, '<').replace(/&gt;/g, '>')
			return await codeToHtml(decodedCode, {
				lang,
				theme: 'one-dark-pro',
			})
		})
	)

	let i = 0
	const processedHtml = htmlContent.replace(
		codeBlockRegex,
		() => highlightedSnippets[i++]
	)

	const options = {
		replace: (domNode: any) => {
			if (domNode instanceof Element && domNode.tagName === 'pre') {
				return (
					<pre className={domNode.attribs.class}>
						{domToReact(domNode.children as DOMNode[])}
					</pre>
				)
			}
		},
	}

	return <div className='prose mx-auto max-w-[642px]'>{parse(processedHtml, options)}</div>
}
