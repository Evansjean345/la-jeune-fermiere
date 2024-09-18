import { useState, useEffect, useMemo } from 'react';
import axios from 'axios';
import MenuItem from '@mui/material/MenuItem';
import { MaterialReactTable } from 'material-react-table';
import { Button, Avatar, CircularProgress, Box, Dialog, DialogActions, DialogContent, DialogTitle, TextField, Alert, Snackbar } from '@mui/material';
import { HiOutlinePencilAlt, } from "react-icons/hi";
import { getOrderUrl, updateStatusOrderUrl } from '../../url';
import { useLocation } from 'react-router-dom';

// Styles for the modal

const OrderTable = () => {

  const location = useLocation();
  const [orders, setOrders] = useState([]);
  const [title, setTitle] = useState('Commandes');
  const [loading, setLoading] = useState(true);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [open, setOpen] = useState(false);
  const [alert, setAlert] = useState({ open: false, message: '', severity: '' });


  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get(getOrderUrl);
        setOrders(response.data);
      } catch (error) {
        console.error('Error fetching orders:', error);
      }
    };
    fetchOrders();
  }, []);

  console.log(orders);

  const filtredOrders = useMemo(() => {
    if (!orders || orders.length === 0) return [];

    let filtred = [];

    switch (location.pathname) {
      case '/dashboard/commandes/nouvelles':
        setTitle('nouvelles commandes');
        filtred = orders.filter(item => item.status === 'new');
        break;
      case '/dashboard/commandes/en-attente':
        setTitle('commandes en attentes');
        filtred = orders.filter(item => item.status === 'pending');
        break;
      case '/dashboard/commandes/en-cours':
        setTitle('commandes en cours');
        filtred = orders.filter(item => item.status === 'processing');
        break;
      case '/dashboard/commandes/delivrer':
        setTitle('commandes délivrer');
        filtred = orders.filter(item => item.status === 'completed');
        break;
      case '/dashboard/commandes/annuler':
        setTitle('commandes annuler');
        filtred = orders.filter(item => item.status === 'canceled');
        break;
      default:
        filtred = orders;
    }

    return filtred;
  }, [orders, location.pathname]);

  console.log(filtredOrders);

  const handleOpen = (order) => {
    setSelectedOrder(order);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedOrder(null);
  };

  const handleStatusUpdate = async () => {
    try {
      const response = await  axios.put(`${updateStatusOrderUrl}/${selectedOrder._id}`, { status: selectedOrder.status });
      setOrders(orders.map(order => order._id === selectedOrder._id ? selectedOrder : order));
      if (response.status === 201) {
        setLoading(false);
        setAlert({ open: true, message: 'Commande mis à jour avec succès!', severity: 'success' });
      }
      handleClose();
    } catch (error) {
      setLoading(false);
      setAlert({ open: true, message: 'Erreur lors de la mise à jour de la commande.', severity: 'error' });
      console.error('Error updating order status:', error);
      handleClose();
    } finally {
      setLoading(false);
    }
  };
  const columns = useMemo(() => [
    {
      accessorKey: 'customer.name',
      header: 'Nom du client',
      size: 120,
    },
    {
      accessorKey: 'customer.phone',
      header: 'Numéro du client',
      size: 120,
    },
    {
      accessorKey: 'articles',
      header: 'Articles',
      size: 120,
      Cell: ({ cell }) => (
        <>
          {cell.getValue().map((item) => (
            <h3 key={item.article._id}>
              {item.article.name} x {item.quantity}
            </h3>
          ))}
        </>
      ),
    },
    {
      accessorKey: 'totalPrice',
      header: 'Prix total',
      size: 100,
      Cell: ({ cell }) => `${cell.getValue()} FCFA`,
    },
    {
      accessorKey: 'status',
      header: 'Statut',
      size: 100,
      Cell: ({ cell }) => renderStatus(cell.getValue()),
    },
    {
      header: 'Actions',
      size: 100,
      Cell: ({ row }) => (
        <Box sx={{ display: 'flex', columnGap: 3 }}>
          <Avatar sx={{ width: '30px', height: '30px', cursor: 'pointer' }} onClick={() => handleOpen(row.original)}>
            <HiOutlinePencilAlt />
          </Avatar>
        </Box>
      ),
    },
  ], []);
  const renderStatus = (status) => {
    let color = '';
    let label = '';

    switch (status) {
      case 'new':
        color = 'info.main';
        label = 'Nouvelle commande';
        break;
      case 'pending':
        color = 'info.main';
        label = 'Commande en attente';
        break;
      case 'processing':
        color = 'warning.main';
        label = 'Commande en cours de traitement';
        break;
      case 'completed':
        color = 'secondary.main';
        label = 'Commande envoyé';
        break;
      case 'canceld':
        color = 'error.main';
        label = 'Commande Annuler';
        break;
      default:
        color = 'text.secondary';
        label = 'Inconnu';
    }

    return (
      <Box
        sx={{
          backgroundColor: color,
          color: '#fff',
          px: 2,
          py: 0.5,
          borderRadius: '4px',
          textAlign: 'center',
        }}
      >
        {label}
      </Box>
    );
  };
  console.log(orders)
  return (
    <div>

      {
        filtredOrders.length < 1 ? (
          <h3 className="text-2xl font-bold mb-4">Aucune commandes dans cette catégorie pour l'instant</h3>
        ) : (
          <>
            <h2 className="text-2xl font-bold mb-4">Liste des {title}</h2>
            <Box>
              <MaterialReactTable
                columns={columns.map((column) => ({
                  ...column,

                  muiTableBodyCellProps: {
                    sx: {
                      backgroundColor: 'rgba(0, 128, 128, 0.1)', // Appliquer une couleur de fond aux cellules du corps
                    },
                  },
                  muiTableHeadCellProps: {
                    sx: {
                      backgroundColor: 'teal', // Appliquer une couleur de fond aux en-têtes de colonnes
                      color: 'white', // Changer la couleur du texte pour une meilleure lisibilité
                    },
                  },
                }))}
                data={filtredOrders} // Filtrer les articles par url
                enableRowSelection={false}
                enablePagination
                muiTableProps={{
                  sx: {
                    tableLayout: 'fixed',
                  },
                }}
              />
            </Box>
          </>

        )
      }

      {/* Modal pour afficher les détails de la commande et mettre à jour le statut */}
      {selectedOrder && (
        <Dialog
          open={open}
          onClose={handleClose}
          maxWidth="md"
          fullWidth
          className='bg-teal-300'
          sx={{
            backgroundColor: 'rgba(0, 128, 128, 0.1)', // Appliquer une couleur de fond aux cellules du corps
          }}

        >
          <DialogTitle
            sx={{
              backgroundColor: 'rgba(0, 128, 128,0.8)', // Appliquer une couleur de fond aux cellules du corps
            }}
            variant='h4'>Information de la commande</DialogTitle>
          <DialogContent
            sx={{
              backgroundColor: 'rgba(0, 128, 128, 0.1)', // Appliquer une couleur de fond aux cellules du corps
            }}>
            <Box
              sx={{ display: "flex", justifyContent: 'space-between', }}
            >

              <Box className='shadow-sm p-2 rounded w-[30%]'>
                <h1 className='text-lg text-teal-700 mb-2'>Détails du client</h1>
                <h3><b className=' text-emerald-600'>Nom du client</b> : {selectedOrder.customer.name}</h3>
                <h3><b className=' text-emerald-600'>Numéro du client</b>: {selectedOrder.customer.phone}</h3>
                <h3><b className=' text-emerald-600'>Email du client</b>: {selectedOrder.customer.email}</h3>
              </Box>
              <Box className='shadow-sm p-2 rounded w-[30%]'>
                <h1 className='text-lg text-teal-700 mb-2'>Détails de la commande</h1>
                <h3><b className=' text-emerald-600'>ID</b>: {selectedOrder._id}</h3>
                <h3><b className=' text-emerald-600'>Articles commander</b> :</h3>
                {selectedOrder.articles.map((item) => (
                  <h3 key={item.article}>
                    {item.article.name} - {item.article.pricePerKilo} FCFA x {item.quantity} kg
                  </h3>
                ))}
              </Box>
              <Box className='shadow-sm p-2 rounded w-[30%]'>
                <h1 className='text-lg text-teal-700 mb-2'>Détails de la livraison</h1>
                {selectedOrder.delivery ? (
                  <>
                    <h3><b className=' text-emerald-600'>Livraison</b>: Oui </h3>
                    <h3><b className=' text-emerald-600'>Montant de la livraison</b>: {selectedOrder.deliveryFee}</h3>
                    <h3><b className=' text-emerald-600'>Lieu de la livraison</b>: {selectedOrder.deliveryLocation}</h3>
                  </>
                ) : (

                  <h3><b className=' text-emerald-600'>Livraison</b>: Non </h3>

                )
                }
              </Box>
            </Box>


            <h3 className='text-xl text-red-600 my-3'>Coût total: {selectedOrder.totalPrice} FCFA</h3>
            <TextField
              select
              label="Statut de la commande"
              value={selectedOrder.status}
              onChange={(e) => setSelectedOrder({ ...selectedOrder, status: e.target.value })}
              fullWidth
              margin="normal"
            >
              <MenuItem value="pending">En attente</MenuItem>
              <MenuItem value="processing">Confirmer</MenuItem>
              <MenuItem value="completed">Envoyé</MenuItem>
              <MenuItem value="canceled">Annulée</MenuItem>
            </TextField>
            <Button variant="contained" color="primary" onClick={handleStatusUpdate} className="mt-4">
            {loading ? <CircularProgress size={24} color="inherit" /> : 'Mettre à jour le statut'}
            </Button>
          </DialogContent>
          <DialogActions
            sx={{
              backgroundColor: 'rgba(0, 128, 128,0.8)', // Appliquer une couleur de fond aux cellules du corps
            }}
          >
            <Button onClick={handleClose} color="secondary">
              Fermer
            </Button>
          </DialogActions>
        </Dialog>
      )}
      <Snackbar anchorOrigin={{ vertical:"top", horizontal:"center" }} open={alert.open} autoHideDuration={6000} onClose={() => setAlert({ ...alert, open: false })}>
        <Alert onClose={() => setAlert({ ...alert, open: false })} severity={alert.severity} sx={{ width: '100%' }}>
          {alert.message}
        </Alert>
      </Snackbar>
    </div>


  );
};

export default OrderTable;
