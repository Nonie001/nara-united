"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Image from "@tiptap/extension-image";
import Link from "@tiptap/extension-link";
import { useEffect } from "react";

type Props = {
  defaultJson?: unknown;
  onChange: (json: unknown, html: string) => void;
};

export function RichTextEditor({ defaultJson, onChange }: Props) {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Image.configure({ inline: false }),
      Link.configure({ openOnClick: false }),
    ],
    content: (defaultJson as never) ?? "",
    immediatelyRender: false,
    editorProps: {
      attributes: {
        class:
          "prose prose-sm sm:prose-base max-w-none min-h-[260px] focus:outline-none px-3 py-2",
      },
    },
    onUpdate({ editor }) {
      onChange(editor.getJSON(), editor.getHTML());
    },
  });

  useEffect(() => () => editor?.destroy(), [editor]);

  if (!editor) {
    return (
      <div className="rounded-md border border-gray-300 min-h-[300px] p-3 text-sm text-gray-400">
        กำลังโหลดเอดิเตอร์...
      </div>
    );
  }

  const Btn = ({
    onClick,
    active,
    children,
  }: {
    onClick: () => void;
    active?: boolean;
    children: React.ReactNode;
  }) => (
    <button
      type="button"
      onClick={onClick}
      className={
        "px-2 h-8 rounded text-xs font-medium " +
        (active ? "bg-nara-green text-white" : "bg-gray-100 hover:bg-gray-200")
      }
    >
      {children}
    </button>
  );

  return (
    <div className="rounded-md border border-gray-300 bg-white">
      <div className="flex flex-wrap gap-1 border-b border-gray-200 p-2">
        <Btn
          onClick={() => editor.chain().focus().toggleBold().run()}
          active={editor.isActive("bold")}
        >
          B
        </Btn>
        <Btn
          onClick={() => editor.chain().focus().toggleItalic().run()}
          active={editor.isActive("italic")}
        >
          I
        </Btn>
        <Btn
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 2 }).run()
          }
          active={editor.isActive("heading", { level: 2 })}
        >
          H2
        </Btn>
        <Btn
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 3 }).run()
          }
          active={editor.isActive("heading", { level: 3 })}
        >
          H3
        </Btn>
        <Btn
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          active={editor.isActive("bulletList")}
        >
          • รายการ
        </Btn>
        <Btn
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          active={editor.isActive("orderedList")}
        >
          1. รายการ
        </Btn>
        <Btn
          onClick={() => editor.chain().focus().toggleBlockquote().run()}
          active={editor.isActive("blockquote")}
        >
          ❝
        </Btn>
        <Btn
          onClick={() => {
            const url = window.prompt("URL ของลิงก์");
            if (url)
              editor
                .chain()
                .focus()
                .extendMarkRange("link")
                .setLink({ href: url })
                .run();
          }}
          active={editor.isActive("link")}
        >
          ลิงก์
        </Btn>
        <Btn
          onClick={() => {
            const url = window.prompt("URL รูปภาพ");
            if (url) editor.chain().focus().setImage({ src: url }).run();
          }}
        >
          รูป
        </Btn>
      </div>
      <EditorContent editor={editor} />
    </div>
  );
}
