var quadrado = function (posX, posY, width, height, color, life) {
	this.posX = posX;
	this.posY = posY;
	this.width = width;
	this.height = height;
	this.color = color;
	this.life = life;
	this.visible = true;
}

quadrado.prototype.halfWidth = function () {
	return this.width / 2;
}
quadrado.prototype.centerX = function () {
	return this.posX + this.halfWidth();
}

quadrado.prototype.halfHeight = function () {
	return this.height / 2;
}
quadrado.prototype.centerY = function () {
	return this.posY + this.halfHeight();
}