function updateClock() {
    const city = document.getElementById('city').value;
    const now = new Date();

    try {
        const options = { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false, timeZone: city };
        const formatter = new Intl.DateTimeFormat('pt-BR', options);
        const parts = formatter.formatToParts(now);

        const h = parts.find(p => p.type === 'hour').value;
        const m = parts.find(p => p.type === 'minute').value;
        const s = parts.find(p => p.type === 'second').value;

        animateNumber('hours', h);
        animateNumber('minutes', m);
        animateNumber('seconds', s);

    } catch (error) {
        console.error("Erro ao obter horário:", error);
    }
}

function animateNumber(elementId, newValue) {
    const element = document.getElementById(elementId);
    const formatted = newValue.toString().padStart(2, '0');

    if (element.textContent !== formatted) {
        element.style.opacity = '0';
        element.style.transform = 'scale(1.3)';

        setTimeout(() => {
            element.textContent = formatted;
            element.style.opacity = '1';
            element.style.transform = 'scale(1)';
        }, 150);
    }
}

setInterval(updateClock, 1000);
updateClock();
