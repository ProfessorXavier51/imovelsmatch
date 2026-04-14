'use client';

import { 
  confirmDelete, 
  successAlert, 
  errorAlert, 
  warningAlert, 
  infoAlert,
  confirmAction,
  loadingAlert,
  closeAlert,
  toast 
} from '@/lib/alerts';

/**
 * Exemplos de uso dos alertas SweetAlert2
 * Componente de demonstração
 */
export function AlertExamples() {
  
  const handleConfirmDelete = async () => {
    const result = await confirmDelete('Cliente João Silva');
    
    if (result.isConfirmed) {
      // Simula loading
      loadingAlert('Deletando cliente...');
      
      // Simula API call
      setTimeout(() => {
        closeAlert();
        successAlert('Cliente deletado com sucesso!');
      }, 2000);
    }
  };

  const handleSuccess = () => {
    successAlert('Operação realizada com sucesso!');
  };

  const handleError = () => {
    errorAlert('Ocorreu um erro ao processar sua solicitação.');
  };

  const handleWarning = () => {
    warningAlert('Atenção! Você atingiu o limite de notificações diárias.');
  };

  const handleInfo = () => {
    infoAlert('Este imóvel já foi notificado para este cliente.');
  };

  const handleCustomConfirm = async () => {
    const result = await confirmAction(
      'Publicar imóvel?',
      'Ao publicar, o sistema irá buscar clientes compatíveis e enviar notificações.',
      'Sim, publicar!'
    );

    if (result.isConfirmed) {
      toast.success('Imóvel publicado com sucesso!');
    }
  };

  const handleToastSuccess = () => {
    toast.success('Cliente cadastrado!');
  };

  const handleToastError = () => {
    toast.error('Erro ao salvar dados!');
  };

  const handleToastWarning = () => {
    toast.warning('Campos obrigatórios não preenchidos!');
  };

  const handleToastInfo = () => {
    toast.info('Novo match encontrado!');
  };

  return (
    <div className="p-8 space-y-4">
      <h1 className="text-2xl font-bold mb-6">Exemplos de Alertas</h1>
      
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <h2 className="text-lg font-semibold">Alertas Modais</h2>
          
          <button
            onClick={handleConfirmDelete}
            className="w-full px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
          >
            Confirmar Deletar
          </button>

          <button
            onClick={handleSuccess}
            className="w-full px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
          >
            Sucesso
          </button>

          <button
            onClick={handleError}
            className="w-full px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
          >
            Erro
          </button>

          <button
            onClick={handleWarning}
            className="w-full px-4 py-2 bg-yellow-600 text-white rounded hover:bg-yellow-700"
          >
            Aviso
          </button>

          <button
            onClick={handleInfo}
            className="w-full px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Informação
          </button>

          <button
            onClick={handleCustomConfirm}
            className="w-full px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700"
          >
            Confirmação Customizada
          </button>
        </div>

        <div className="space-y-2">
          <h2 className="text-lg font-semibold">Toast Notifications</h2>
          
          <button
            onClick={handleToastSuccess}
            className="w-full px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
          >
            Toast Sucesso
          </button>

          <button
            onClick={handleToastError}
            className="w-full px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
          >
            Toast Erro
          </button>

          <button
            onClick={handleToastWarning}
            className="w-full px-4 py-2 bg-yellow-600 text-white rounded hover:bg-yellow-700"
          >
            Toast Aviso
          </button>

          <button
            onClick={handleToastInfo}
            className="w-full px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Toast Info
          </button>
        </div>
      </div>
    </div>
  );
}
