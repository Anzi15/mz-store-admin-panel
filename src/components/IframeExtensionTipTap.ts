import { Node, RawCommands } from '@tiptap/core';
import { Transaction } from 'prosemirror-state';

export default Node.create({
  name: 'iframe',

  group: 'block',

  atom: true,

  addOptions() {
    return {
      allowFullscreen: true,
      HTMLAttributes: {
        class: 'iframe-wrapper',
      },
    };
  },

  addAttributes() {
    return {
      src: {
        default: null,
      },
      width: {
        default: '560',
      },
      height: {
        default: '315',
      },
      title: {
        default: 'Embedded Content',
      },
      frameborder: {
        default: 0,
      },
      allow: {
        default: 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share',
      },
      referrerpolicy: {
        default: 'strict-origin-when-cross-origin',
      },
      allowfullscreen: {
        default: true,
      },
    };
  },

  parseHTML() {
    return [
      {
        tag: 'iframe',
      },
    ];
  },

  renderHTML({ HTMLAttributes }) {
    return ['iframe', HTMLAttributes];
  },

  addCommands() {
    return {
      setIframe: (options: { src: string }) => ({ tr, dispatch }: { tr: Transaction; dispatch: (tr: Transaction) => void }) => {
        const { selection } = tr;
        const node = this.type.create(options);

        tr.replaceRangeWith(selection.from, selection.to, node);

        dispatch(tr);

        return true;
      },
    } as Partial<RawCommands>;
  },
});
