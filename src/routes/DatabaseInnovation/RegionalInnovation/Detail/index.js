import React, { useState } from 'react';
import {
  Link,
  useNavigate,
  useParams,
  useSearchParams,
  createSearchParams,
} from 'react-router-dom';
import Chipper from '../../../../components/Chipper';
import {
  BASE_API_URL,
  GET_ALL_INDICATOR,
  GET_REGIONAL_INNOVATION_QUERY_KEY,
} from '../../../../constans/constans';
import { getAllIndicator } from '../../../../services/MasterData/indicator';
import { useQuery } from 'react-query';
import { BiArrowBack } from 'react-icons/bi';
import { getRegionalInnovation } from '../../../../services/DatabaseInnovation/regional';
import IndicatorList from './IndicatorList';
import TextEditor from '../../../../components/TextEditorQuill';
import axios from 'axios';
import { getToken, getUser } from '../../../../utils';

const initialIndicatorFilterParams = {
  page: 1,
  limit: 10,
  jenis_indikator: 'si',
};

const Timeline = ({ value, handleEditComment, handleDeleteComment }) => {
  const stripHtml = (html) => {
    const div = document.createElement('div');
    div.innerHTML = html;
    return div.textContent || div.innerText || '';
  };

  const sortCommentsByDate = (comments) => {
    return comments.sort(
      (a, b) => new Date(b.date_groups) - new Date(a.date_groups)
    );
  };

  const sortedComments = sortCommentsByDate(value ?? []);

  return (
    <div>
      <ol className="ms-4 relative border-s border-gray-200 dark:border-gray-700">
        {sortedComments.map((event, idx) => (
          <li key={idx} className="mb-10 ms-4">
            <div className="absolute w-3 h-3 bg-gray-200 rounded-full mt-1.5 -start-1.5 border border-white dark:border-gray-900 dark:bg-gray-700" />
            <time className="mb-1 text-lg font-bold leading-none text-dark ">
              {event.date_groups}
            </time>
            {event.details.map((card, cardIdx) => (
              <div
                key={cardIdx}
                className="border mt-3 border-gray-600 rounded-lg px-4 py-4 bg-white w-70 z-10 sm:w-72 me-2 mb-2 cursor-pointer hover:shadow-lg"
                onClick={() => {
                  if (getUser()?.is_super_admin === "y")
                    handleEditComment(
                      card.comment.comment,
                      card.id,
                      card.gov_innov_id
                    )
                }
                } // Pass edit handler
              >
                <div className="">
                  <div className="text-black font-bold text-left text-xl h-[50px]">
                    {card.user_id.full_name}
                  </div>
                  <div className="text-red-500 font-bold text-left text-xl h-[50px]">
                    {stripHtml(card.comment.comment)}
                  </div>
                  <div className="text-black text-md font-thin">
                    {card.date_formatted}
                  </div>
                  {getUser()?.is_super_admin === "y" ? <button
                    className="text-red-500 hover:text-black"
                    onClick={(e) => {
                      e.stopPropagation(); // Prevent triggering the edit handler
                      handleDeleteComment(card.id, card.gov_innov_id);
                    }}
                  >
                    Hapus
                  </button> : <div />}
                </div>
              </div>
            ))}
          </li>
        ))}
      </ol>
    </div>
  );
};

const DetailItem = (props) => {
  const { label, value, download, isHtml } = props;

  return (
    <div className="flex flex-col gap-2">
      <div className="text-[#333] font-bold">{label}</div>
      <div className="flex gap-2 items-center">
        {isHtml ? (
          <div
            className="text-[#333]"
            dangerouslySetInnerHTML={{ __html: value }}
          />
        ) : (
          <div className="text-[#333]">{value}</div>
        )}
        {download && (
          <Link
            to={download?.full_path}
            download={download?.name}
            target="_blank"
            rel="noreferrer"
            className="text-[#069DD9]"
          >
            Download
          </Link>
        )}
      </div>
    </div>
  );
};

const RegionalInnovationDetail = () => {
  const [indicatorFilterParams, setIndicatorFilterParams] = React.useState(
    initialIndicatorFilterParams
  );
  const [showEditor, setShowEditor] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [selectedComment, setSelectedComment] = useState(null);
  const [innovId, setInnovId] = useState(null);
  const [commentId, setCommentId] = useState(null);
  const params = useParams();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const currentId = params.id;

  // Handler for adding a comment
  const handlePostComment = () => {
    setIsEditing(false);
    setSelectedComment('');
    setInnovId(currentId);
    setCommentId(null);
    setShowEditor(true);
  };

  // Handler for editing a comment (passed to Timeline component)
  const handleEditComment = (comment, id, innovId) => {
    setIsEditing(true);
    setSelectedComment(comment);
    setInnovId(innovId);
    setCommentId(id);
    setShowEditor(true);
  };

  // Function to handle cancel button in TextEditor
  const handleCancel = () => {
    setShowEditor(false);
    setInnovId(null);
    setCommentId(null);
  };

  // Function to delete a comment
  const handleDeleteComment = async (commentId, innovId) => {
    deleteComment(innovId, commentId).then(() => {
      window.location.reload();
    }).catch((err) => console.log(err))
  };

  const deleteComment = async (innovId, commentId) => {
    try {
      const token = getToken().token;
      const headers = {
        Authorization: `Bearer ${token}`,
        Accept: 'application/json',
        'Content-Type': 'application/json',
      };

      const response = await axios({
        method: 'DELETE',
        url: `${BASE_API_URL}/inovasi_pemerintah_daerah/${innovId}/comment/${commentId}`,
        headers: headers,
      });

      return response;
    } catch (error) {
      console.error('Failed to delete comment:', error.message || error);
      throw error; // Rethrow the error so it can be handled by the caller
    }
  };

  const tabActive = parseInt(searchParams.get('tabActive')) || 0;

  const { data: indicators } = useQuery(
    [GET_ALL_INDICATOR, indicatorFilterParams],
    getAllIndicator(indicatorFilterParams)
  );

  const { data } = useQuery(
    [GET_REGIONAL_INNOVATION_QUERY_KEY],
    getRegionalInnovation(currentId),
    {
      enabled: !!currentId,
    }
  );

  const onChangeTabActive = (value) => {
    navigate({
      pathname: '',
      search: createSearchParams({
        tabActive: value,
      }).toString(),
    });
  };


  // const hasTimeline = data?.data?.comments_timeline?.length > 0;

  return (
    <div className="w-full flex flex-col gap-6 py-6">
      <div className="text-[#333333] text-2xl">Inovasi Daerah</div>
      <div className="w-full bg-white rounded-lg p-8 flex flex-col gap-6">
        <div className="flex items-center gap-2">
          <Link to="/inovasi-daerah">
            <BiArrowBack />
          </Link>
          <span className="font-medium text-lg">Detail Inovasi Daerah</span>
        </div>
        <div className="flex items-center w-full gap-3">
          <Chipper
            active={tabActive === 0}
            label="Profil Inovasi"
            onClick={() => {
              onChangeTabActive(0);
            }}
          />
          <Chipper
            active={tabActive === 1}
            label="Indikator"
            onClick={() => {
              onChangeTabActive(1);
            }}
          />
          {getUser()?.is_super_admin === "y" && tabActive === 0 && (
            <div className="absolute right-56">
              <Chipper
                active={tabActive === 2}
                label="Tambah Komentar"
                onClick={handlePostComment}
              />
            </div>
          )}
        </div>
        {tabActive === 0 && (
          <div className="flex gap-6">
            <div className="flex-1 flex-col gap-6 overflow-y-auto h-screen">
              <DetailItem
                label={'Nama Pemda'}
                value={data?.data?.government_name}
              />
              <DetailItem
                label="Nama Inovasi"
                value={data?.data?.innovation_name}
              />

              <DetailItem
                label="Tahapan Inovasi"
                value={data?.data?.innovation_phase}
              />

              <DetailItem
                label="Inisiator Inovasi Daerah"
                value={data?.data?.innovation_initiator}
              />

              <DetailItem
                label="Jenis Inovasi"
                value={data?.data?.innovation_type || '-'}
              />

              <DetailItem
                label="Bentuk Inovasi Daerah"
                value={data?.data?.innovation_form || '-'}
              />

              <DetailItem label="Tematik" value={data?.data?.thematic || '-'} />

              <DetailItem
                label="Waktu Uji Coba"
                value={data?.data?.trial_time || '-'}
              />
              <DetailItem
                label="Waktu Penerapan"
                value={data?.data?.implementation_time || '-'}
              />
              <DetailItem
                label="Nama Admin"
                value={data?.data?.pemda?.full_name || '-'}
              />

              <DetailItem
                isHtml
                label="Rancang Bangun"
                value={data?.data?.design || ''}
              />

              <DetailItem
                isHtml
                label="Tujuan Inovasi Daerah"
                value={data?.data?.purpose || ''}
              />

              <DetailItem
                isHtml
                label="Manfaat Inovasi Daerah"
                value={data?.data?.benefit || ''}
              />

              <DetailItem
                isHtml
                label="Hasil Inovasi"
                value={data?.data?.result || ''}
              />
            </div>

            <div className="flex-1 flex-col gap-6 overflow-y-auto h-screen">
              {showEditor ? (
                <TextEditor
                  selectedEvent={selectedComment}
                  commentId={commentId}
                  innovId={innovId}
                  isEditing={isEditing}
                  handleCancel={handleCancel} // Pass handleCancel to the TextEditor
                />
              ) : (
                <Timeline
                  value={data?.data?.comments_timeline}
                  handleEditComment={handleEditComment}
                  handleDeleteComment={handleDeleteComment}
                />
              )}
            </div>
          </div>
        )}

        {tabActive === 1 && (
          <IndicatorList
            etcData={data?.data?.indikator}
            data={indicators}
            params={indicatorFilterParams}
            setIndicatorFilterParams={setIndicatorFilterParams}
          />
        )}
      </div>
    </div>
  );
};

export default RegionalInnovationDetail;
