(function inicial() {

	// alert('Após 5 colisões, o jogo se encerrará e quem tiver a maior porcentagem de vida vence, boa sorte!')


	let cnv = document.querySelector("#tinhosoCanvas");
	let ctx = cnv.getContext("2d");
	let blk = 9999;
	let colisaoEntrePlayers = 0;
	danoSofridoP1 = 0;
	danoSofridoP2 = 0;
	let visualizarDano = 0;

	const player1Img = new Image(50, 50)
	player1Img.src = '/images/bgp1.png'

	const player2Img = new Image(50, 50)
	player2Img.src = '/images/bgp2.png'



	let statusJogo = document.querySelector('#status');
	let vidaFinal1 = document.querySelector('#vidaFinal1')
	let vidaFinal2 = document.querySelector('#vidaFinal2')
	let renicie = document.querySelector('#statusReinicie')


	const LEFT = 37;
	const UP = 38;
	const RIGHT = 39;
	const DOWN = 40;

	const A = 65;
	const W = 87;
	const D = 68;
	const S = 83;


	let moverLeft = moverUp = moverRight = moverDown = false;

	let mover2Left = mover2Up = mover2Right = mover2Down = false;
	let quadrados = [];
	let obstaculos = [];


	let p1 = new quadrado(40, 180, 50, 50, "#ffffff", 100);
	quadrados.push(p1);


	let p2 = new quadrado(710, 180, 50, 50, "#ffffff", 100);
	quadrados.push(p2);


	let obs1 = new quadrado(130, 90, 20, 210, "#000", 9999);
	quadrados.push(obs1);
	obstaculos.push(obs1);

	let obs2 = new quadrado(640, 90, 20, 210, "#000", 9999);
	quadrados.push(obs2);
	obstaculos.push(obs2);

	let obs3 = new quadrado(380, 150, 20, 100, "#000", 9999);
	quadrados.push(obs3);
	obstaculos.push(obs3);



	function loop() {
		window.requestAnimationFrame(loop, cnv);

		movimentoP();
		movimentoP2();
		render();

		ctx.drawImage(
			player1Img,
			0, 0, 50, 50,
			p1.posX,
			p1.posY,
			p1.width,
			p1.height
		)

		ctx.drawImage(
			player2Img,
			0, 0, 50, 50,
			p2.posX,
			p2.posY,
			p2.width,
			p2.height
		)

	}


	window.addEventListener("keydown", function (e) {
		let key = e.keyCode;
		switch (key) {
			case LEFT:
				moverLeft = true;
				break;
			case UP:
				moverUp = true;
				break;
			case RIGHT:
				moverRight = true;
				break;
			case DOWN:
				moverDown = true;
				break;
		}
	}, false);

	window.addEventListener("keyup", function (e) {
		let key = e.keyCode;
		switch (key) {
			case LEFT:
				moverLeft = false;
				break;
			case UP:
				moverUp = false;
				break;
			case RIGHT:
				moverRight = false;
				break;
			case DOWN:
				moverDown = false;
				break;
		}
	}, false);


	window.addEventListener("keydown", function (r) {
		let key = r.keyCode;
		switch (key) {
			case A:
				mover2Left = true;
				break;
			case W:
				mover2Up = true;
				break;
			case D:
				mover2Right = true;
				break;
			case S:
				mover2Down = true;
				break;
		}
	}, false);


	window.addEventListener("keyup", function (r) {
		let key = r.keyCode;
		switch (key) {
			case A:
				mover2Left = false;
				break;
			case W:
				mover2Up = false;
				break;
			case D:
				mover2Right = false;
				break;
			case S:
				mover2Down = false;
				break;
		}
	}, false);


	//funções
	p1.velocidade = 6;




	function movimentoP() {
		if (moverLeft && !moverRight) {
			p1.posX -= p1.velocidade;
		}
		if (moverRight && !moverLeft) {
			p1.posX += p1.velocidade;
		}
		if (moverUp && !moverDown) {
			p1.posY -= p1.velocidade;
		}
		if (moverDown && !moverUp) {
			p1.posY += p1.velocidade;
		}
		//Limites da tela
		p1.posX = Math.max(0, Math.min(cnv.width - p1.width, p1.posX));
		p1.posY = Math.max(0, Math.min(cnv.height - p1.height, p1.posY));

		//Colisões
		for (let i in obstaculos) {
			let blk = obstaculos[i];
			if (blk.visible) {
				colisaoObs(p1, blk);
			}
			if (blk.visible) {
				colisaoObs(p1, p2);

			}
		}
	}
	p2.velocidade = 3;

	function movimentoP2() {
		if (mover2Left && !mover2Right) {
			p2.posX -= p2.velocidade = 6;
		}
		if (mover2Right && !mover2Left) {
			p2.posX += p2.velocidade = 6;
		}
		if (mover2Up && !mover2Down) {
			p2.posY -= p2.velocidade = 6;
		}
		if (mover2Down && !mover2Up) {
			p2.posY += p2.velocidade = 6;
		}

		p2.posX = Math.max(0, Math.min(cnv.width - p2.width, p2.posX));
		p2.posY = Math.max(0, Math.min(cnv.height - p2.height, p2.posY));



		for (let i in obstaculos) {
			var blk = obstaculos[i];
			if (blk.visible) {
				colisaoObs(p2, blk);


			}
		}
		if (blk.visible) {
			colisaoObs(p2, p1);
		}


	}

	// funcao colisao -----------------------------------------------------------




	function colisaoObs(r1, r2) {

		if (colisaoEntrePlayers > 4) {
			fim();
		}

		let posX = r1.centerX() - r2.centerX();
		let posY = r1.centerY() - r2.centerY();
		let somaMetadeWidth = r1.halfWidth() + r2.halfWidth();
		let somaMetadeHeight = r1.halfHeight() + r2.halfHeight();



		if (Math.abs(posX) < somaMetadeWidth && Math.abs(posY) < somaMetadeHeight) {

			let colisaoX = somaMetadeWidth - Math.abs(posX);
			let colisaoY = somaMetadeHeight - Math.abs(posY);

			if (colisaoX >= colisaoY) {


				if (posY > 0) {

					r1.posY += colisaoY;


					let visualizarDano = Math.floor(Math.random() * 21);
					let visualizarDano2 = Math.floor(Math.random() * 21);
					colisaoEntrePlayers++;
					// console.log(colisaoEntrePlayers);


					p1.posX = 0;
					p2.posX = 800;

					r1.life -= visualizarDano;
					r2.life -= visualizarDano2;
					console.log(r1.life);
					console.log(r2.life);

					vidaFinal1.textContent = p1.life;
					vidaFinal2.textContent = p2.life;


				} else {
					r1.posY -= colisaoY;

					let visualizarDano = Math.floor(Math.random() * 21);
					let visualizarDano2 = Math.floor(Math.random() * 21);
					colisaoEntrePlayers++;
					// console.log(colisaoEntrePlayers);


					p1.posX = 0;
					p2.posX = 800;

					r1.life -= visualizarDano;
					r2.life -= visualizarDano2;
					console.log(r1.life);
					console.log(r2.life);

					vidaFinal1.textContent = p1.life;
					vidaFinal2.textContent = p2.life;
				}

			} else {
				if (posX > 0) {
					r1.posX += colisaoX;

					let visualizarDano = Math.floor(Math.random() * 21);
					let visualizarDano2 = Math.floor(Math.random() * 21);
					colisaoEntrePlayers++;
					// console.log(colisaoEntrePlayers);


					p1.posX = 0;
					p2.posX = 800;

					r1.life -= visualizarDano;
					r2.life -= visualizarDano2;
					console.log(r1.life);
					console.log(r2.life);

					vidaFinal1.textContent = p1.life;
					vidaFinal2.textContent = p2.life;

				} else {
					r1.posX -= colisaoX;

					let visualizarDano = Math.floor(Math.random() * 21);
					let visualizarDano2 = Math.floor(Math.random() * 21);
					colisaoEntrePlayers++;
					// console.log(colisaoEntrePlayers);


					p1.posX = 0;
					p2.posX = 800;

					r1.life -= visualizarDano;
					r2.life -= visualizarDano2;
					console.log(r1.life);
					console.log(r2.life);

					vidaFinal1.textContent = p1.life;
					vidaFinal2.textContent = p2.life;


				}


			}

		}
	}

	// fim funcao colisao -----------------------------------------------------------

	
	function render() {
		ctx.clearRect(0, 0, cnv.width, cnv.height);
		for (let i in quadrados) {
			let spr = quadrados[i];
			if (spr.visible) {
				ctx.fillStyle = spr.color;
				ctx.fillRect(spr.posX, spr.posY, spr.width, spr.height);
			}
		}
	}


	function fim() {
		moverLeft = moverDown = moverRight = moverUp = false;
		mover2Left = mover2Down = mover2Right = mover2Up = false;

		vidaFinal1.textContent = p1.life;
		vidaFinal2.textContent = p2.life;

		renicie.textContent = ('REINICIE A PAGINA PARA RECOMEÇAR');

		if (p1.life > p2.life) {
			statusJogo.textContent = ('FIM JOGO! PARABÉNS, QUEM GANHOU FOI O TINHOSO');
		} else {
			statusJogo.textContent = ('FIM JOGO! PARABÉNS, QUEM GANHOU FOI O ryubô');
		}



	}



	loop();
}());