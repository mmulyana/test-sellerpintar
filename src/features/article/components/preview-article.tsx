'use client'

import { Button } from '@/shared/components/ui/button'
import { Sheet, SheetContent, SheetTrigger } from '@/shared/components/ui/sheet'
import { codeToHtml } from 'shiki'
import parse, { DOMNode, domToReact, Element } from 'html-react-parser'
import { useEffect, useState } from 'react'
import { ScrollArea } from '@/shared/components/ui/scroll-area'
import { DialogHeader, DialogTitle } from '@/shared/components/ui/dialog'

export default function PreviewArticle({
	title,
	content,
}: {
	title: string
	content: string
}) {
	return (
		<Sheet>
			<SheetTrigger asChild>
				<Button variant='secondary' type='button'>
					Preview
				</Button>
			</SheetTrigger>
			<SheetContent className='md:min-w-[1120px] min-w-full'>
				<DialogHeader className='pt-6'>
					<DialogTitle className='text-center'>Preview</DialogTitle>
				</DialogHeader>
				<div className='w-full mx-auto px-5 md:px-0'>
					<p className='max-w-[642px] mx-auto text-center text-3xl text-slate-900 font-semibold mt-4 mb-10'>
						{title}
					</p>
					<ScrollArea className='h-[calc(100vh-140px)] px-8'>
						<SafeHtmlRenderer htmlContent={content} />
					</ScrollArea>
				</div>
			</SheetContent>
		</Sheet>
	)
}

function SafeHtmlRenderer({ htmlContent }: { htmlContent: string }) {
	const [processedHtml, setProcessedHtml] = useState<string | null>(null)

	useEffect(() => {
		const processHtml = async () => {
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
			const finalHtml = htmlContent.replace(
				codeBlockRegex,
				() => highlightedSnippets[i++]
			)

			setProcessedHtml(finalHtml)
		}

		processHtml()
	}, [htmlContent])

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

	if (!processedHtml) {
		return (
			<div className='prose mx-auto max-w-full'>
				{parse(htmlContent, options)}
			</div>
		)
	}

	return (
		<div className='prose mx-auto max-w-full'>
			{parse(processedHtml, options)}
		</div>
	)
}
