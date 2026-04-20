import React, { useRef, useEffect, useCallback, useState } from 'react';
import {
    Bold, Italic, Underline,
    Heading1, Heading2, Heading3,
    List, ListOrdered, Quote,
    Strikethrough, Pilcrow
} from 'lucide-react';

const cn = (...classes: any[]) => classes.filter(Boolean).join(' ');

interface RichTextEditorProps {
    value: string;
    onChange: (html: string) => void;
    placeholder?: string;
    minHeight?: string;
    className?: string;
}

export const RichTextEditor: React.FC<RichTextEditorProps> = ({
    value,
    onChange,
    placeholder = 'Start writing...',
    minHeight = '140px',
    className,
}) => {
    const editorRef = useRef<HTMLDivElement>(null);
    const isInternalUpdate = useRef(false);
    const [activeFormats, setActiveFormats] = useState<Set<string>>(new Set());
    const [activeBlock, setActiveBlock] = useState<string>('');

    // Sync external value changes into the editor
    useEffect(() => {
        const el = editorRef.current;
        if (!el) return;
        if (isInternalUpdate.current) {
            isInternalUpdate.current = false;
            return;
        }
        if (el.innerHTML !== value) {
            el.innerHTML = value || '';
        }
    }, [value]);

    // Detect active formats at cursor position
    const updateActiveFormats = useCallback(() => {
        const formats = new Set<string>();
        if (document.queryCommandState('bold')) formats.add('bold');
        if (document.queryCommandState('italic')) formats.add('italic');
        if (document.queryCommandState('underline')) formats.add('underline');
        if (document.queryCommandState('strikeThrough')) formats.add('strikeThrough');
        if (document.queryCommandState('insertUnorderedList')) formats.add('insertUnorderedList');
        if (document.queryCommandState('insertOrderedList')) formats.add('insertOrderedList');
        setActiveFormats(formats);

        const block = document.queryCommandValue('formatBlock').toLowerCase();
        setActiveBlock(block);
    }, []);

    const emit = useCallback(() => {
        if (editorRef.current) {
            isInternalUpdate.current = true;
            onChange(editorRef.current.innerHTML);
        }
    }, [onChange]);

    const exec = useCallback((command: string, val?: string) => {
        editorRef.current?.focus();
        document.execCommand(command, false, val);
        emit();
        updateActiveFormats();
    }, [emit, updateActiveFormats]);

    // Toggle block format: if already active → revert to paragraph, otherwise apply
    const toggleBlock = useCallback((tag: string) => {
        editorRef.current?.focus();
        const current = document.queryCommandValue('formatBlock').toLowerCase();
        if (current === tag.toLowerCase()) {
            document.execCommand('formatBlock', false, 'p');
        } else {
            document.execCommand('formatBlock', false, tag);
        }
        emit();
        updateActiveFormats();
    }, [emit, updateActiveFormats]);

    // Revert to plain paragraph
    const clearBlock = useCallback(() => {
        editorRef.current?.focus();
        document.execCommand('formatBlock', false, 'p');
        emit();
        updateActiveFormats();
    }, [emit, updateActiveFormats]);

    const handleInput = useCallback(() => {
        emit();
        updateActiveFormats();
    }, [emit, updateActiveFormats]);

    const handleKeyUp = useCallback(() => {
        updateActiveFormats();
    }, [updateActiveFormats]);

    const handleMouseUp = useCallback(() => {
        updateActiveFormats();
    }, [updateActiveFormats]);

    // Prevent plain-text paste from losing formatting context
    const handlePaste = useCallback((e: React.ClipboardEvent) => {
        e.preventDefault();
        const text = e.clipboardData.getData('text/plain');
        document.execCommand('insertText', false, text);
    }, []);

    type BtnDef =
        | { kind: 'icon'; icon: React.ElementType; title: string; action: () => void; key: string }
        | { kind: 'text'; label: string; title: string; action: () => void; key: string };

    const groups: BtnDef[][] = [
        [
            { kind: 'icon', icon: Bold, title: 'Bold (Ctrl+B)', action: () => exec('bold'), key: 'bold' },
            { kind: 'icon', icon: Italic, title: 'Italic (Ctrl+I)', action: () => exec('italic'), key: 'italic' },
            { kind: 'icon', icon: Underline, title: 'Underline (Ctrl+U)', action: () => exec('underline'), key: 'underline' },
            { kind: 'icon', icon: Strikethrough, title: 'Strikethrough', action: () => exec('strikeThrough'), key: 'strikeThrough' },
        ],
        [
            { kind: 'icon', icon: Pilcrow, title: 'Normal (paragraph)', action: clearBlock, key: '_p' },
            { kind: 'icon', icon: Heading1, title: 'H1 (click again to remove)', action: () => toggleBlock('h1'), key: 'h1' },
            { kind: 'icon', icon: Heading2, title: 'H2 (click again to remove)', action: () => toggleBlock('h2'), key: 'h2' },
            { kind: 'icon', icon: Heading3, title: 'H3 (click again to remove)', action: () => toggleBlock('h3'), key: 'h3' },
        ],
        [
            { kind: 'icon', icon: List, title: 'Bullet List', action: () => exec('insertUnorderedList'), key: 'insertUnorderedList' },
            { kind: 'icon', icon: ListOrdered, title: 'Numbered List', action: () => exec('insertOrderedList'), key: 'insertOrderedList' },
            { kind: 'icon', icon: Quote, title: 'Blockquote (click again to remove)', action: () => toggleBlock('blockquote'), key: 'blockquote' },
        ],
    ];

    const isActive = (key: string) => {
        if (key === '_p') return activeBlock === 'p' || activeBlock === '';
        if (key === 'h1') return activeBlock === 'h1';
        if (key === 'h2') return activeBlock === 'h2';
        if (key === 'h3') return activeBlock === 'h3';
        if (key === 'blockquote') return activeBlock === 'blockquote';
        return activeFormats.has(key);
    };

    return (
        <div className={cn('border-[1.5px] border-[#e3e6ec] rounded-[7px] overflow-hidden focus-within:border-[#2563eb] transition-all bg-white', className)}>
            {/* Toolbar */}
            <div className="flex items-center gap-0.5 px-2 py-1.5 border-b border-[#e3e6ec] bg-[#f8fafc] flex-wrap">
                {groups.map((group, gi) => (
                    <React.Fragment key={gi}>
                        {gi > 0 && <div className="w-px h-4 bg-[#e3e6ec] mx-1 shrink-0" />}
                        {group.map((btn) => {
                            const active = isActive(btn.key);
                            return (
                                <button
                                    key={btn.key}
                                    type="button"
                                    title={btn.title}
                                    onMouseDown={(e) => {
                                        e.preventDefault();
                                        btn.action();
                                    }}
                                    className={cn(
                                        'p-1.5 rounded-[5px] text-[11px] font-bold transition-all',
                                        active
                                            ? 'bg-[#2563eb] text-white shadow-sm'
                                            : 'text-[#68748a] hover:bg-white hover:text-[#2563eb] hover:shadow-sm'
                                    )}
                                >
                                    {btn.kind === 'icon'
                                        ? <btn.icon size={13} strokeWidth={2.2} />
                                        : btn.label
                                    }
                                </button>
                            );
                        })}
                    </React.Fragment>
                ))}
            </div>

            {/* Editable area */}
            <div
                ref={editorRef}
                contentEditable
                suppressContentEditableWarning
                onInput={handleInput}
                onKeyUp={handleKeyUp}
                onMouseUp={handleMouseUp}
                onPaste={handlePaste}
                style={{ minHeight }}
                className="p-[12px] text-[13px] text-slate-900 outline-none leading-relaxed overflow-y-auto rich-editor-content"
                data-placeholder={placeholder}
            />

            <style>{`
                .rich-editor-content:empty:before {
                    content: attr(data-placeholder);
                    color: #98a3b3;
                    pointer-events: none;
                }
                .rich-editor-content h1 { font-size: 1.25em; font-weight: 700; margin: 0.4em 0; }
                .rich-editor-content h2 { font-size: 1.1em; font-weight: 700; margin: 0.35em 0; }
                .rich-editor-content h3 { font-size: 1em; font-weight: 600; margin: 0.3em 0; }
                .rich-editor-content ul { list-style: disc; padding-left: 1.4em; margin: 0.3em 0; }
                .rich-editor-content ol { list-style: decimal; padding-left: 1.4em; margin: 0.3em 0; }
                .rich-editor-content blockquote {
                    border-left: 3px solid #2563eb;
                    margin: 0.4em 0;
                    padding: 0.2em 0.8em;
                    color: #475569;
                    background: #f0f5ff;
                    border-radius: 0 4px 4px 0;
                }
                .rich-editor-content b, .rich-editor-content strong { font-weight: 700; }
                .rich-editor-content i, .rich-editor-content em { font-style: italic; }
                .rich-editor-content u { text-decoration: underline; }
                .rich-editor-content s { text-decoration: line-through; }
                .rich-editor-content p { margin: 0.2em 0; }
            `}</style>
        </div>
    );
};
