import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";

const ReactMarkdownSnippet = ({ children }) => {
  return (
    <ReactMarkdown
      remarkPlugins={[remarkGfm]}
      rehypePlugins={[rehypeRaw]}
      components={{
        a: ({ children, href }) => {
          return (
            <a
              href={href}
              target="_blank"
              rel="noreferrer"
              onClick={(e) => e.stopPropagation()}
            >
              {children}
            </a>
          );
        },
      }}
    >
      {children}
    </ReactMarkdown>
  );
};

export default ReactMarkdownSnippet;

// import { createElement } from "react";
// import remark from "remark-parse";
// import remark2rehype from "remark-rehype";
// import rehypeRaw from "rehype-raw";
// import { unified } from "unified";
// import rehype2react from "rehype-react";

// const ReactMarkdownSnippet = ({ children, components = {} }) => {
//   components.a = (props) => {
//     return (
//       <a
//         href={props.href}
//         target="_blank"
//         rel="noreferrer"
//         onClick={(e) => e.stopPropagation()}
//       >
//         {props.children}
//       </a>
//     );
//   };
//   const processor = unified()
//     .use(remark)
//     .use(remark2rehype, { allowDangerousHtml: true })
//     .use(rehypeRaw)
//     .use(rehype2react, {
//       components,
//       createElement,
//     });
//   const result = processor.processSync(children).result;
//   return <div>{result}</div>;
// };
// export default ReactMarkdownSnippet;
