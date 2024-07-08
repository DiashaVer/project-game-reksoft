let cvs = document.getElementById('map');
let ctx = cvs.getContext('2d');
let gameController = new GameController(cvs);
let progressBar = document.getElementById('progressBar');
let log = document.getElementById('log');
let map_size;
let blockSize;

gameController.displayMap = (map) => {
    for (let i = 0; i < map.cells.length; i++) {
        let cell = map.cells[i];
        let x = parseInt(i/map.height);
        let y = i - x * map.height;
        map_size = map.height;
        blockSize = cvs.width / map_size
        ctx.drawImage(
            defineCellType(cell), 
            x * blockSize, 
            y * blockSize, 
            blockSize, 
            blockSize
        );
    }
}

gameController.displayPlayers = (players) => {
    for (let i = 0; i < players.length; i++) {
        let player = players[i];
        ctx.drawImage(
            player.icon,
            player.location.x *  blockSize,
            player.location.y * blockSize,
            blockSize, 
            blockSize
        );
    }
};

gameController.incrementProgress = () => {
    gameController.remainingSwitchTime += 100;
    progressBar.value = gameController.remainingSwitchTime / gameController.game.switchTimeout * 100;
}

document.addEventListener('keydown', (event) => {
    switch(event.key) {
        case 'ArrowDown':
            gameController.movePlayer(GameApi.MoveDirection.bottom);
            break;
        case 'ArrowUp':
            gameController.movePlayer(GameApi.MoveDirection.top);
            break;
        case 'ArrowRight':
            gameController.movePlayer(GameApi.MoveDirection.right);
            break;
        case 'ArrowLeft':
            gameController.movePlayer(GameApi.MoveDirection.left);
            break;
    }
});

gameController.log = (message) => {
    log.value += message + '\n'
};

document.getElementById('startButton').addEventListener('click', () => {
    gameController.start();
});

document.getElementById('stopButton').addEventListener('click', () => {
    gameController.stop();
});

document.getElementById('joinButton').addEventListener('click', () => {
    gameController.join();
});

document.getElementById('cancelButton').addEventListener('click', () => {
    gameController.cancel();
});

document.getElementById('exitButton').addEventListener('click', () => {
    gameController.disconnect();
});

document.getElementById('disconnectButton').addEventListener('click', () => {
    gameController.leave();
});

document.getElementById('reconnectButton').addEventListener('click', () => {
    gameController.reconnect();
});


function defineCellType (type) {
    switch(type) {
        case GameApi.MapCellType.empty:
        default:
            return gameController.icons.empty || null;
        case GameApi.MapCellType.wall:
            return gameController.icons.wall || null;
        case GameApi.MapCellType.coin:
            return gameController.icons.coin || null;
        case GameApi.MapCellType.life:
            return gameController.icons.life || null;
        case GameApi.MapCellType.swtch:
            return gameController.icons.switch || null;
        case GameApi.MapCellType.thiefRespawn:
            return gameController.icons.empty || null;
        case GameApi.MapCellType.policeRespawn:
            return gameController.icons.empty || null;
        case 7:
            return gameController.icons.police || null; //полицейский
        case 8:
            return gameController.icons.thief || null; //вор
    }
};
