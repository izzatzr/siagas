import React, { useState } from "react";
import { CKEditor } from "ckeditor4-react";

export const Editor = ({
  label,
  value,
  onChange,
  required,
  placeholder,
  height,
  errorText,
  customToolbar,
}) => {
  const [loaded, setLoaded] = useState(false);

  React.useEffect(() => {
    setLoaded(true);
  }, []);

  return (
    <div className="w-full">
      <div className="text-[#333333] text-sm font-normal mb-2">
        {label} {required && <span className="text-sm text-red-500">*</span>}
      </div>
      {loaded ? (
        <CKEditor
          initData={value.toString() || ``}
          editorUrl={"https://cdn.ckeditor.com/4.16.0/standard-all/ckeditor.js"}
          onChange={(evt) => {
            onChange(evt.editor?.getData());
          }}
          config={{
            alignment: {
              options: ["left", "right", "center", "justify"],
            },
            editorplaceholder: placeholder,
            extraPlugins:
              "editorplaceholder,font,blockquote,codesnippet,colorbutton,justify",
            height,
            toolbar: [
              { name: "styles", items: ["Font", "Format", "FontSize"] },
              {
                name: "basicstyles",
                items: [
                  "Bold",
                  "Italic",
                  "Underline",
                  "Strike",
                  "-",
                  "Blockquote",
                  "CodeSnippet",
                  "Link",
                  "-",
                  "Subscript",
                  "Superscript",
                ],
              },
              {
                name: "fonts",
                items: ["TextColor"],
              },
              {
                name: "alignment",
                items: [
                  "JustifyLeft",
                  "JustifyCenter",
                  "JustifyRight",
                  "JustifyBlock",
                ],
              },
              { name: "insert", items: ["Upload", "Image"] },
              {
                name: "list",
                items: ["BulletedList", "NumberedList", "-", "Outdent", "Indent", '-', "RemoveFormat"],
              },
            ],
            removeButtons: "",
          }}
        />
      ) : (
        <>Loading...</>
      )}
      {errorText && (
        <div className="text-sm text-red-500 mt-1">{errorText}</div>
      )}
    </div>
  );
};
