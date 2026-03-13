// Toggle Help Panel
function toggleHelp() {
    const helpPanel = document.getElementById('helpPanel');
    helpPanel.classList.toggle('show');
}

document.addEventListener('DOMContentLoaded', () => {
    // Resizer functionality
    const resizer = document.getElementById('resizer');
    const consolePanel = document.querySelector('.console-panel');
    const editorPanel = document.querySelector('.editor-panel');
    let isResizing = false;

    resizer.addEventListener('mousedown', (e) => {
        isResizing = true;
        document.body.style.cursor = 'col-resize';
        document.body.style.userSelect = 'none';
    });

    document.addEventListener('mousemove', (e) => {
        if (!isResizing) return;

        const containerRect = document.querySelector('.split-container').getBoundingClientRect();
        const newLeftWidth = e.clientX - containerRect.left;
        const totalWidth = containerRect.width;
        const newLeftPercent = (newLeftWidth / totalWidth) * 100;
        const newRightPercent = 100 - newLeftPercent;

        if (newLeftPercent > 20 && newLeftPercent < 80) {
            consolePanel.style.flex = `0 0 ${newLeftPercent}%`;
            editorPanel.style.flex = `0 0 ${newRightPercent}%`;
        }
    });

    document.addEventListener('mouseup', () => {
        if (isResizing) {
            isResizing = false;
            document.body.style.cursor = '';
            document.body.style.userSelect = '';
        }
    });

    // Menu items functionality
    const menuItems = document.querySelectorAll('.menu-item');
    menuItems.forEach(item => {
        item.addEventListener('click', () => {
            console.log(`${item.textContent} menu clicked`);
        });
    });

    // Tool buttons functionality
    const toolBtns = document.querySelectorAll('.tool-btn');
    toolBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const title = btn.getAttribute('title');
            console.log(`${title} clicked`);
        });
    });

    // Panel buttons functionality
    const panelBtns = document.querySelectorAll('.panel-btn');
    panelBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const title = btn.getAttribute('title');
            console.log(`${title} clicked`);
        });
    });

    // Keyboard shortcuts
    document.addEventListener('keydown', (e) => {
        // Ctrl+Enter to open practicals
        if (e.ctrlKey && e.key === 'Enter') {
            window.location.href = 'index.html';
        }
        
        // Ctrl+H to toggle help
        if (e.ctrlKey && e.key === 'h') {
            e.preventDefault();
            toggleHelp();
        }

        // Escape to close help
        if (e.key === 'Escape') {
            const helpPanel = document.getElementById('helpPanel');
            if (helpPanel.classList.contains('show')) {
                toggleHelp();
            }
        }
    });

    // Add tooltips for keyboard shortcuts
    const primaryBtn = document.querySelector('.action-btn.primary');
    primaryBtn.title = 'Ctrl+Enter';

    const secondaryBtn = document.querySelector('.action-btn.secondary');
    secondaryBtn.title = 'Ctrl+H';

    // Animate console cursor
    const cursor = document.querySelector('.cursor');
    if (cursor) {
        setInterval(() => {
            cursor.style.opacity = cursor.style.opacity === '0' ? '1' : '0';
        }, 500);
    }

    // Add entrance animation
    const ideContainer = document.querySelector('.ide-container');
    ideContainer.style.opacity = '0';
    ideContainer.style.transform = 'scale(0.95)';
    
    setTimeout(() => {
        ideContainer.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        ideContainer.style.opacity = '1';
        ideContainer.style.transform = 'scale(1)';
    }, 100);

    // Simulate typing in console (optional animation)
    const consoleText = document.querySelector('.console-text');
    if (consoleText) {
        // Add a welcome message after a delay
        setTimeout(() => {
            const newLine = document.createElement('span');
            newLine.className = 'prompt';
            newLine.textContent = '\n> ';
            consoleText.appendChild(newLine);
            
            const comment = document.createElement('span');
            comment.className = 'comment';
            comment.textContent = '# Click "Open All Practicals" to begin';
            consoleText.appendChild(comment);
            
            // Scroll to bottom
            const consoleContent = document.querySelector('.console-content');
            consoleContent.scrollTop = consoleContent.scrollHeight;
        }, 1000);
    }
});

// Handle window resize
window.addEventListener('resize', () => {
    const splitContainer = document.querySelector('.split-container');
    const consolePanel = document.querySelector('.console-panel');
    const editorPanel = document.querySelector('.editor-panel');
    
    if (window.innerWidth <= 768) {
        consolePanel.style.flex = '1';
        editorPanel.style.flex = '1';
    }
});
