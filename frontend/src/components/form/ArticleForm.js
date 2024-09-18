import { useState } from 'react';
import axios from 'axios';
import { useForm } from 'react-hook-form';
import CircularProgress from '@mui/material/CircularProgress';
import { Dialog, DialogContent, DialogTitle } from '@mui/material';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import LinearProgress from '@mui/material/LinearProgress';
import { FileUploader } from "react-drag-drop-files";
import { createArticleUrl, updateArticleUrl } from '../../url';

const ArticleForm = ({ article = {}, onSuccess }) => {
  const { register, reset, handleSubmit, formState: { errors } } = useForm({});
  const [loading, setLoading] = useState(false);
  const [images, setImages] = useState([]);
  const [imagePreviews, setImagePreviews] = useState([]);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [open, setOpen] = useState(false);
  const [alert, setAlert] = useState({ open: false, message: '', severity: '' });

  const handleOpen = (order) => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  // Types de fichiers acceptés
  const fileTypes = ["JPG", "PNG", "GIF"];

  const onSubmit = async (data) => {
    setLoading(true);

    try {
      const formData = new FormData();
      formData.append('name', data.name);
      formData.append('type', data.type);
      formData.append('pricePerKilo', data.pricePerKilo);
      images.forEach((image) => {
        formData.append('images', image);
      });

      const config = {
        onUploadProgress: (progressEvent) => {
          const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
          setUploadProgress(percentCompleted);
        }
      };

      if (article._id) {
        await axios.put(`${updateArticleUrl}/${article._id}`, formData, config);
      } else {
        await axios.post(createArticleUrl, formData, config);
      }

      setLoading(false);
      reset();
      setImages([]);
      setImagePreviews([]);
      setUploadProgress(0);
      setAlert({ open: true, message: 'Article sauvegardé avec succès!', severity: 'success' });
    } catch (error) {
      setLoading(false);
      setAlert({ open: true, message: 'Erreur lors de la sauvegarde de l\'article.', severity: 'error' });
      console.error('Error saving article:', error);
    }
  };

  const handleChangeFile = (fileList) => {
    const files = Array.from(fileList);
    setImages(files);
    const previews = files.map(file => URL.createObjectURL(file));
    setImagePreviews(previews);
  };

  return (
    <>

      <h2 className="text-2xl font-bold mb-4">Ajouter un nouvel article</h2>
      <button type="submit" className="bg-teal-700 text-white px-4 py-2 w-[25%]" onClick={handleOpen}>
        Ajouter un article
      </button>

      <Dialog
        open={open}
        onClose={handleClose}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle>Ajouter un nouvel article</DialogTitle>
        <DialogContent>
          <div className='flex justify-center'>
            <form onSubmit={handleSubmit(onSubmit)} className="p-4 mb-4 w-[80%]">
              <div className="mb-4">
                <label className="text-primary-marineBlue font-[500] mb-2">Désignation de l'article</label>
                <input
                  {...register('name', { required: true })}
                  type="text"
                  placeholder="Nom de l'article"
                  className={`w-full ${errors.name ? "border-2 border-red-500" : "border"} rounded-[4px] p-3`}
                />
                {errors.name && <p className="text-red-500">Ce champ est requis</p>}
              </div>

              <div className="mb-4">
                <label className="text-primary-marineBlue font-[500] mb-2">Type de l'article</label>
                <select
                  {...register('type', { required: true })}
                  className={`w-full ${errors.type ? "border-2 border-red-500" : "border"} rounded-[4px] p-3`}
                >
                  <option value="">Sélectionner un type</option>
                  <option value="agneau">agneau</option>
                  <option value="avant de bœuf">avant de bœuf</option>
                  <option value="arrière de bœuf">arrière de bœuf</option>
                  <option value="volaille">volaille</option>
                </select>
                {errors.type && <p className="text-red-500">Ce champ est requis</p>}
              </div>

              <div className="mb-4">
                <label className="text-primary-marineBlue font-[500] mb-2">Prix de l'article par kilo</label>
                <input
                  {...register('pricePerKilo', { required: true })}
                  type="number"
                  placeholder="Prix de l'article"
                  className={`w-full ${errors.pricePerKilo ? "border-2 border-red-500" : "border"} rounded-[4px] p-3`}
                />
                {errors.pricePerKilo && <p className="text-red-500">Ce champ est requis</p>}
              </div>

              <div className="mb-4">
                <label className="text-primary-marineBlue font-[500] mb-2">Télécharger des images</label>
                <FileUploader
                  handleChange={handleChangeFile}
                  name="file"
                  types={fileTypes}
                  hoverTitle="Veuillez sélectionner un fichier"
                  multiple
                  classes="zone-drop col-1"
                />
              </div>

              {imagePreviews.length > 0 && (
                <div className="mb-4">
                  <label className="text-primary-marineBlue font-[500] mb-2">Aperçu des images</label>
                  <div className="flex gap-4">
                    {imagePreviews.map((preview, index) => (
                      <img key={index} src={preview} alt={`Preview ${index + 1}`} className="w-40 h-40 object-cover" />
                    ))}
                  </div>
                </div>
              )}

              {uploadProgress > 0 && (
                <div className="mb-4">
                  <label className="text-primary-marineBlue font-[500] mb-2">Progression du téléchargement</label>
                  <LinearProgress variant="determinate" value={uploadProgress} />
                </div>
              )}

              <button type="submit" className="bg-teal-700 text-white px-4 py-2">
                {loading ? <CircularProgress size={24} color="inherit" /> : 'Valider'}
              </button>
            </form>
          </div>

        </DialogContent>

      </Dialog>
      <Snackbar anchorOrigin={{ vertical:"top", horizontal:"center" }} open={alert.open} autoHideDuration={6000} onClose={() => setAlert({ ...alert, open: false })}>
        <Alert onClose={() => setAlert({ ...alert, open: false })} severity={alert.severity} sx={{ width: '100%' }}>
          {alert.message}
        </Alert>
      </Snackbar>
    </>
  );
};

export default ArticleForm;
