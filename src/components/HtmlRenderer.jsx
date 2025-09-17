import DOMPurify from 'dompurify';
import "./renderedHtmlStylings.scss"

const HtmlRenderer = ({ rawHtml }) => {
  // Configuring DOMPurify to allow iframes and specific attributes
  const sanitizedHtml = DOMPurify.sanitize(rawHtml, {
    ADD_TAGS: ['iframe'],
    ADD_ATTR: [
      'allow',
      'allowfullscreen',
      'frameborder',
      'height',
      'src',
      'width',
      'title',
      'referrerpolicy',
    ],
  });


  return (
    <div
      dangerouslySetInnerHTML={{ __html: sanitizedHtml }}
      className="text-left man-made-html"
    />
  );
};

export default HtmlRenderer;