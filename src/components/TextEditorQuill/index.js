import { useEffect, useState } from 'react';
import 'quill/dist/quill.snow.css';
import Quill from 'quill';

export default function TextEditor({ selectedEvent }) {
  const [quillInstance, setQuillInstance] = useState(null);

  useEffect(() => {
    const toolbarOptions = [
      ['bold', 'italic', 'underline', 'strike'],
      [{ list: 'ordered' }, { list: 'bullet' }],
      [{ size: ['small', false, 'large', 'huge'] }],
      [{ header: [1, 2, 3, 4, 5, 6, false] }],
      ['link', 'image', 'video', 'formula'],
    ];

    if (quillInstance) {
      quillInstance.destroy();
      setQuillInstance(null);
    }

    const existingEditor = document.querySelector('.ql-container');
    if (!existingEditor && selectedEvent) {
      const data = document.getElementById('data');
      if (data) {
        const quill = new Quill(data, {
          modules: {
            toolbar: toolbarOptions,
          },
          theme: 'snow',
        });
        setQuillInstance(quill);

        const eventData = `${selectedEvent.title}\n${selectedEvent.description}`;
        quill.setText(eventData);
      }
    }

    return () => {
      if (quillInstance) {
        quillInstance.destroy();
        setQuillInstance(null);
      }
    };
  }, [selectedEvent]);

  return (
    <div className="quill">
      <div id="data"></div>
    </div>
  );
}
