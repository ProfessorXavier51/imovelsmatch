import Swal from 'sweetalert2';

/**
 * Biblioteca de alertas usando SweetAlert2
 * Compatível com React 19 e Next.js
 */

export const confirmDelete = async (itemName: string = 'este item') => {
  return await Swal.fire({
    title: 'Tem certeza?',
    text: `Você está prestes a deletar ${itemName}. Esta ação não pode ser desfeita!`,
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#dc2626',
    cancelButtonColor: '#6b7280',
    confirmButtonText: 'Sim, deletar!',
    cancelButtonText: 'Cancelar',
    reverseButtons: true,
  });
};

export const successAlert = (message: string, title: string = 'Sucesso!') => {
  return Swal.fire({
    title,
    text: message,
    icon: 'success',
    confirmButtonColor: '#059669',
    confirmButtonText: 'OK',
  });
};

export const errorAlert = (message: string, title: string = 'Erro!') => {
  return Swal.fire({
    title,
    text: message,
    icon: 'error',
    confirmButtonColor: '#dc2626',
    confirmButtonText: 'OK',
  });
};

export const warningAlert = (message: string, title: string = 'Atenção!') => {
  return Swal.fire({
    title,
    text: message,
    icon: 'warning',
    confirmButtonColor: '#f59e0b',
    confirmButtonText: 'OK',
  });
};

export const infoAlert = (message: string, title: string = 'Informação') => {
  return Swal.fire({
    title,
    text: message,
    icon: 'info',
    confirmButtonColor: '#3b82f6',
    confirmButtonText: 'OK',
  });
};

export const confirmAction = async (
  title: string,
  text: string,
  confirmText: string = 'Sim, confirmar!'
) => {
  return await Swal.fire({
    title,
    text,
    icon: 'question',
    showCancelButton: true,
    confirmButtonColor: '#059669',
    cancelButtonColor: '#6b7280',
    confirmButtonText: confirmText,
    cancelButtonText: 'Cancelar',
    reverseButtons: true,
  });
};

export const loadingAlert = (message: string = 'Processando...') => {
  return Swal.fire({
    title: message,
    allowOutsideClick: false,
    allowEscapeKey: false,
    showConfirmButton: false,
    didOpen: () => {
      Swal.showLoading();
    },
  });
};

export const closeAlert = () => {
  Swal.close();
};

export const toast = {
  success: (message: string) => {
    Swal.fire({
      toast: true,
      position: 'top-end',
      icon: 'success',
      title: message,
      showConfirmButton: false,
      timer: 3000,
      timerProgressBar: true,
    });
  },
  error: (message: string) => {
    Swal.fire({
      toast: true,
      position: 'top-end',
      icon: 'error',
      title: message,
      showConfirmButton: false,
      timer: 3000,
      timerProgressBar: true,
    });
  },
  warning: (message: string) => {
    Swal.fire({
      toast: true,
      position: 'top-end',
      icon: 'warning',
      title: message,
      showConfirmButton: false,
      timer: 3000,
      timerProgressBar: true,
    });
  },
  info: (message: string) => {
    Swal.fire({
      toast: true,
      position: 'top-end',
      icon: 'info',
      title: message,
      showConfirmButton: false,
      timer: 3000,
      timerProgressBar: true,
    });
  },
};
