# SCRIPT: kill-port-3001.ps1
# Mata o processo que esta usando a porta 3001

Write-Host "Procurando processo na porta 3001..." -ForegroundColor Yellow

# Busca o PID do processo na porta 3001
$process = Get-NetTCPConnection -LocalPort 3001 -ErrorAction SilentlyContinue | Select-Object -First 1

if ($process) {
    $processId = $process.OwningProcess
    Write-Host "Processo encontrado: PID $processId" -ForegroundColor Green
    
    # Mata o processo
    Stop-Process -Id $processId -Force
    Write-Host "Processo $processId finalizado!" -ForegroundColor Red
    
    # Aguarda 1 segundo
    Start-Sleep -Seconds 1
    
    Write-Host "Porta 3001 liberada! Pode rodar npm run start:dev" -ForegroundColor Green
} else {
    Write-Host "Nenhum processo encontrado na porta 3001" -ForegroundColor Cyan
}
