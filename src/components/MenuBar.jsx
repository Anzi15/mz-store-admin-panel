import "./MenuBar.scss";
import {
  FaBold,
  FaCode,
  FaHighlighter,
  FaItalic,
  FaLevelDownAlt,
  FaParagraph,
  FaQuoteLeft,
  FaRedo,
  FaStrikethrough,
  FaUndo,
  FaYoutube,
} from "react-icons/fa";
import { Fragment } from "react";
import MenuItem from "./MenuItem.jsx";
import {
  MdFormatItalic,
  MdFormatListBulleted,
  MdOutlineHorizontalRule,
} from "react-icons/md";
import { LuHeading1, LuHeading2 } from "react-icons/lu";
import { GoListOrdered } from "react-icons/go";
import Iframe from "./IframeExtensionTipTap";

function extractYouTubeVideoId(url) {
  // Regular YouTube URL (e.g., https://www.youtube.com/watch?v=VIDEO_ID)
  const regularUrlPattern = /(?:https?:\/\/)?(?:www\.)?youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=|.*[?&]v=)([a-zA-Z0-9_-]{11})/;
  // Shortened YouTube URL (e.g., https://youtu.be/VIDEO_ID)
  const shortUrlPattern = /(?:https?:\/\/)?youtu\.be\/([a-zA-Z0-9_-]{11})/;

  let match = url.match(regularUrlPattern);
  if (match) {
    return match[1];
  }

  match = url.match(shortUrlPattern);
  if (match) {
    return match[1];
  }

  return null;
}

export default function MenuBar({ editor }) {
  const items = [
    {
      icon: <FaBold />,
      title: <FaBold />,
      action: () => editor.chain().focus().toggleBold().run(),
      isActive: () => editor.isActive("bold"),
    },
    {
      icon: <FaItalic />,
      title: <FaItalic />,
      action: () => editor.chain().focus().toggleItalic().run(),
      isActive: () => editor.isActive("italic"),
    },
    {
      icon: <FaStrikethrough />,
      title: <FaStrikethrough />,
      action: () => editor.chain().focus().toggleStrike().run(),
      isActive: () => editor.isActive("strike"),
    },
    {
      icon: <FaCode />,
      title: <FaCode />,
      action: () => editor.chain().focus().toggleCode().run(),
      isActive: () => editor.isActive("code"),
    },
    {
      icon: <FaHighlighter />,
      title: <FaHighlighter />,
      action: () => editor.chain().focus().toggleHighlight().run(),
      isActive: () => editor.isActive("highlight"),
    },
    {
      icon: <LuHeading1 />,
      title: <LuHeading1 />,
      action: () => editor.chain().focus().toggleHeading({ level: 1 }).run(),
      isActive: () => editor.isActive("heading", { level: 1 }),
    },
    {
      icon: <LuHeading2 />,
      title: <LuHeading2 />,
      action: () => editor.chain().focus().toggleHeading({ level: 2 }).run(),
      isActive: () => editor.isActive("heading", { level: 2 }),
    },
    {
      icon: <FaParagraph />,
      title: <FaParagraph />,
      action: () => editor.chain().focus().setParagraph().run(),
      isActive: () => editor.isActive("paragraph"),
    },
    {
      icon: <MdFormatListBulleted />,
      title: <MdFormatListBulleted />,
      action: () => editor.chain().focus().toggleBulletList().run(),
      isActive: () => editor.isActive("bulletList"),
    },
    {
      icon: <GoListOrdered />,
      title: <GoListOrdered />,
      action: () => editor.chain().focus().toggleOrderedList().run(),
      isActive: () => editor.isActive("orderedList"),
    },
    {
      icon: <FaQuoteLeft />,
      title: <FaQuoteLeft />,
      action: () => editor.chain().focus().toggleBlockquote().run(),
      isActive: () => editor.isActive("blockquote"),
    },
    {
      icon: <MdOutlineHorizontalRule />,
      title: <MdOutlineHorizontalRule />,
      action: () => editor.chain().focus().setHorizontalRule().run(),
    },
    {
      icon: <FaYoutube/>,
      title: <FaYoutube />,
      action: () => {
        const url = prompt("Enter YouTube video URL");
        const videoId = extractYouTubeVideoId(url);
        if (videoId) {
          const embedUrl = `https://www.youtube.com/embed/${videoId}`;
          editor.chain().focus().setIframe({ src: embedUrl }).run();
        } else {
          alert("Invalid YouTube URL");
        }
      },
    },
    {
      icon: <FaLevelDownAlt />,
      title: <FaLevelDownAlt />,
      action: () => editor.chain().focus().setHardBreak().run(),
    },

    {
      icon: <FaUndo />,
      title: <FaUndo />,
      action: () => editor.chain().focus().undo().run(),
    },
    {
      icon: <FaRedo />,
      title: <FaRedo />,
      action: () => editor.chain().focus().redo().run(),
    },

  ];

  return (
    <div className="editor__header">
      {items.map((item, index) => (
        <Fragment key={index}>
          {item.type === "divider" ? (
            <div className="divider" />
          ) : (
            <MenuItem {...item} />
          )}
        </Fragment>
      ))}
    </div>
  );
}
