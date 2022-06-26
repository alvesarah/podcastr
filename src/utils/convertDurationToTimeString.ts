export function convertDurationToTimeString(duration: number){
    const hours = Math.floor(duration / 3600) //Convertendo segundos em horas
    const minutes = Math.floor((duration % 3600) / 60); //Quantos segundos sobram da divisão de horas e transformá-los em minutos
    const seconds = duration % 60;

    const timeString = [hours, minutes, seconds]
        .map(unit => String(unit).padStart(2, '0'))
        .join(':')
    
        return timeString;
} 