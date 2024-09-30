import { useEffect, useState } from 'react';
import 'quill/dist/quill.snow.css';
import Quill from 'quill';
import axios from 'axios';
import { BASE_API_URL } from '../../constans/constans';
import { getToken } from '../../utils';

export default function TextEditor({
  selectedEvent,
  commentId,
  innovId,
  isEditing,
  handleCancel,
}) {
  const [quillInstance, setQuillInstance] = useState(null);

  const handleSubmit = async () => {
    const baseUrl = isEditing
      ? `${BASE_API_URL}/inovasi_pemerintah_daerah/${innovId}/comment/${commentId}`
      : `${BASE_API_URL}/inovasi_pemerintah_daerah/${innovId}/comment`;

    try {
      const token = getToken().token;
      const headers = {
        Authorization: `Bearer ${token}`,
        Accept: 'application/json',
        'Content-Type': 'application/json',
      };

      const content = quillInstance.root.innerHTML;

      const response = await axios({
        method: isEditing ? 'PATCH' : 'POST',
        url: baseUrl,
        data: { comment: content },
        headers,
      });

      console.log(response.data, 'response');
      window.location.href = `/inovasi-daerah/${innovId}/indikator`;
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const toolbarOptions = [
      ['bold', 'italic', 'underline', 'strike'],
      [{ list: 'ordered' }, { list: 'bullet' }],
      ['link', 'image'],
    ];

    if (!quillInstance) {
      const data = document.getElementById('data');
      const quill = new Quill(data, {
        // modules: { toolbar: toolbarOptions },
        theme: 'snow',
      });
      setQuillInstance(quill);

      if (selectedEvent) {
        quill.root.innerHTML = selectedEvent; // Load content for editing
      }
    }

    return () => {
      if (quillInstance) {
        quillInstance.off();
        setQuillInstance(null);
      }
    };
  }, [selectedEvent, quillInstance]);

  return (
    <div className="quill">
      <div id="data"></div>
      <div className="flex flex-row gap-4 mt-4 justify-center font-semibold">
        <button
          className="border border-blue-400 py-2 px-2 w-[80px] rounded-lg hover:bg-blue-100"
          onClick={handleSubmit}
        >
          {isEditing ? 'Update' : 'Post'}
        </button>
        <button
          className="border border-blue-400 py-2 px-2 w-[80px] rounded-lg hover:bg-red-300"
          onClick={handleCancel}
        >
          Cancel
        </button>
      </div>
    </div>
  );
}
