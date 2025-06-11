'use client'

import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import CodeBlockLowlight from '@tiptap/extension-code-block-lowlight'
import Image from '@tiptap/extension-image'
import Link from '@tiptap/extension-link'
import { createLowlight } from 'lowlight'
import javascript from 'highlight.js/lib/languages/javascript'
import typescript from 'highlight.js/lib/languages/typescript'
import python from 'highlight.js/lib/languages/python'
import css from 'highlight.js/lib/languages/css'
import html from 'highlight.js/lib/languages/xml'
import php from 'highlight.js/lib/languages/php'
import { Button } from '@/shared/components/ui/button'
import { Input } from '@/shared/components/ui/input'
import TextAlign from '@tiptap/extension-text-align'
import CharacterCount from '@tiptap/extension-character-count'
import {
	Bold,
	Italic,
	Code,
	Code2,
	ImageIcon,
	LinkIcon,
	Undo2,
	Redo2,
	AlignLeft,
	AlignCenter,
	AlignRight,
	AlignJustify,
} from 'lucide-react'
import { useEffect, useState } from 'react'
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from '@/shared/components/ui/dialog'
import { Label } from '@/shared/components/ui/label'
import { cn } from '@/shared/utils'

const lowlight = createLowlight()
lowlight.register('javascript', javascript)
lowlight.register('typescript', typescript)
lowlight.register('python', python)
lowlight.register('css', css)
lowlight.register('html', html)
lowlight.register('php', php)

export default function TextEditor({
	defaultValue,
	onChange,
	invalid,
}: {
	defaultValue?: string
	onChange?: (val: string) => void
	invalid?: boolean
}) {
	const [imageUrl, setImageUrl] = useState('')
	const [linkUrl, setLinkUrl] = useState('')
	const [linkText, setLinkText] = useState('')
	const [isImageDialogOpen, setIsImageDialogOpen] = useState(false)
	const [isLinkDialogOpen, setIsLinkDialogOpen] = useState(false)
	const [wordCount, setWordCount] = useState(0)

	const editor = useEditor({
		extensions: [
			StarterKit,
			CodeBlockLowlight.configure({
				lowlight,
				defaultLanguage: 'javascript',
			}),
			Image.configure({
				HTMLAttributes: {
					class: 'max-w-full h-auto rounded-lg',
				},
			}),
			Link.configure({
				openOnClick: false,
				HTMLAttributes: {
					class: 'text-blue-500 underline cursor-pointer',
				},
			}),
			TextAlign.configure({
				types: ['heading', 'paragraph'],
			}),
			CharacterCount.configure(),
		],
		content: defaultValue ?? "Type a content...",
		onUpdate: ({ editor }) => {
			const html = editor.getHTML()
			onChange?.(html)
		},
		editorProps: {
			attributes: {
				class: 'prose p-4 max-w-full',
				spellcheck: 'false',
			},
		},
	})

	const addImage = () => {
		if (imageUrl && editor) {
			editor.chain().focus().setImage({ src: imageUrl }).run()
			setImageUrl('')
			setIsImageDialogOpen(false)
		}
	}

	const addLink = () => {
		if (linkUrl && editor) {
			if (linkText) {
				editor
					.chain()
					.focus()
					.insertContent(`<a href="${linkUrl}">${linkText}</a>`)
					.run()
			} else {
				editor.chain().focus().setLink({ href: linkUrl }).run()
			}
			setLinkUrl('')
			setLinkText('')
			setIsLinkDialogOpen(false)
		}
	}

	useEffect(() => {
		if (!editor) return
		const updateWordCount = () => {
			setWordCount(editor.storage.characterCount.words())
		}

		updateWordCount()

		editor.on('update', updateWordCount)

		return () => {
			editor.off('update', updateWordCount)
		}
	}, [editor])

	useEffect(() => {
		if (
			editor &&
			defaultValue !== undefined &&
			defaultValue !== null &&
			editor.getHTML() !== defaultValue
		) {
			editor.commands.setContent(defaultValue, false)
		}
	}, [editor, defaultValue])

	if (!editor) {
		return null
	}

	return (
		<div className='w-full'>
			<div
				className={cn(
					'border border-border rounded-lg overflow-hidden',
					invalid && 'border-red-600'
				)}
			>
				{/* Toolbar */}
				<div className='flex flex-wrap gap-4 p-4 items-center border-b borde-border bg-white'>
					{/* Undo/Redo */}
					<div className='flex gap-0.5'>
						<Button
							type='button'
							variant='ghost'
							className='p-0 w-4 hover:bg-transparent h-5 rounded'
							onClick={() => editor.chain().focus().undo().run()}
							disabled={!editor.can().undo()}
						>
							<Undo2 size={16} />
						</Button>
						<Button
							type='button'
							variant='ghost'
							className='p-0 w-4 hover:bg-transparent h-5 rounded'
							onClick={() => editor.chain().focus().redo().run()}
							disabled={!editor.can().redo()}
						>
							<Redo2 size={16} />
						</Button>
					</div>

					{/* Text Formatting */}
					<div className='flex gap-0.5'>
						<Button
							type='button'
							variant={editor.isActive('bold') ? 'secondary' : 'ghost'}
							className='p-0 w-4 hover:bg-transparent h-5 rounded'
							onClick={() => editor.chain().focus().toggleBold().run()}
						>
							<Bold size={16} />
						</Button>
						<Button
							type='button'
							variant={editor.isActive('italic') ? 'secondary' : 'ghost'}
							className='p-0 w-4 hover:bg-transparent h-5 rounded'
							onClick={() => editor.chain().focus().toggleItalic().run()}
						>
							<Italic size={16} />
						</Button>
					</div>

					<div className='h-6 w-0.5 rounded-full bg-slate-200' />
					{/* Image Dialog */}
					<Dialog open={isImageDialogOpen} onOpenChange={setIsImageDialogOpen}>
						<DialogTrigger asChild>
							<Button
								type='button'
								variant='ghost'
								className='p-0 w-4 hover:bg-transparent h-5 rounded'
							>
								<ImageIcon size={16} />
							</Button>
						</DialogTrigger>
						<DialogContent>
							<DialogHeader>
								<DialogTitle>Add Image</DialogTitle>
							</DialogHeader>
							<div className='space-y-4'>
								<div>
									<Label htmlFor='image-url'>Image URL</Label>
									<Input
										id='image-url'
										placeholder='https://example.com/image.jpg'
										value={imageUrl}
										onChange={(e) => setImageUrl(e.target.value)}
									/>
								</div>
								<Button type='button' onClick={addImage} className='w-full'>
									Add Image
								</Button>
							</div>
						</DialogContent>
					</Dialog>
					<div className='h-6 w-0.5 rounded-full bg-slate-200' />
					<div className='flex gap-0.5'>
						<Button
							type='button'
							variant={
								editor.isActive({ textAlign: 'left' }) ? 'secondary' : 'ghost'
							}
							className='p-0 w-4 hover:bg-transparent h-5 rounded'
							onClick={() => editor.chain().focus().setTextAlign('left').run()}
						>
							<AlignLeft />
						</Button>
						<Button
							type='button'
							variant={
								editor.isActive({ textAlign: 'center' }) ? 'secondary' : 'ghost'
							}
							className='p-0 w-4 hover:bg-transparent h-5 rounded'
							onClick={() =>
								editor.chain().focus().setTextAlign('center').run()
							}
						>
							<AlignCenter />
						</Button>
						<Button
							type='button'
							variant={
								editor.isActive({ textAlign: 'right' }) ? 'secondary' : 'ghost'
							}
							className='p-0 w-4 hover:bg-transparent h-5 rounded'
							onClick={() => editor.chain().focus().setTextAlign('right').run()}
						>
							<AlignRight />
						</Button>
						<Button
							type='button'
							variant={
								editor.isActive({ textAlign: 'justify' })
									? 'secondary'
									: 'ghost'
							}
							className='p-0 w-4 hover:bg-transparent h-5 rounded'
							onClick={() =>
								editor.chain().focus().setTextAlign('justify').run()
							}
						>
							<AlignJustify />
						</Button>
					</div>
					<div className='h-6 w-0.5 rounded-full bg-slate-200' />
					{/* Code Block */}
					<div className='flex gap-0.5'>
						<Button
							type='button'
							variant={editor.isActive('code') ? 'secondary' : 'ghost'}
							className='p-0 w-4 hover:bg-transparent h-5 rounded'
							onClick={() => editor.chain().focus().toggleCode().run()}
						>
							<Code size={16} />
						</Button>

						<Button
							type='button'
							variant={editor.isActive('codeBlock') ? 'secondary' : 'ghost'}
							className='p-0 w-4 hover:bg-transparent h-5 rounded'
							onClick={() => editor.chain().focus().toggleCodeBlock().run()}
						>
							<Code2 size={16} />
						</Button>

						{/* Link Dialog */}
						<Dialog open={isLinkDialogOpen} onOpenChange={setIsLinkDialogOpen}>
							<DialogTrigger asChild>
								<Button
									type='button'
									variant='ghost'
									className='p-0 w-4 hover:bg-transparent h-5 rounded'
								>
									<LinkIcon size={16} />
								</Button>
							</DialogTrigger>
							<DialogContent>
								<DialogHeader>
									<DialogTitle>Add Link</DialogTitle>
								</DialogHeader>
								<div className='space-y-4'>
									<div>
										<Label htmlFor='link-url'>URL</Label>
										<Input
											id='link-url'
											placeholder='https://example.com'
											value={linkUrl}
											onChange={(e) => setLinkUrl(e.target.value)}
										/>
									</div>
									<div>
										<Label htmlFor='link-text'>Link Text (optional)</Label>
										<Input
											id='link-text'
											placeholder='Click here'
											value={linkText}
											onChange={(e) => setLinkText(e.target.value)}
										/>
									</div>
									<Button type='button' onClick={addLink} className='w-full'>
										Add Link
									</Button>
								</div>
							</DialogContent>
						</Dialog>
					</div>
				</div>

				{/* Editor Content */}
				<div className='min-h-[400px]'>
					<EditorContent editor={editor} />
				</div>
				<div className='bg-white py-6 px-4'>{wordCount} words</div>
			</div>
		</div>
	)
}
