/**
 * FluentWindow: Windows 11風タイトルバー制御クラス
 * ヌルッとした操作感とマイカ効果を統合する核心パーツ
 */
export class FluentWindow extends HTMLElement {
	constructor() {
		super();
		this.attachShadow({ mode: 'open' });
		this.isDragging = false;
		this.offset = { x: 0, y: 0};
	}
	
	connectedCallback() {
		this.render();
		this.initDrag();
	}
	
	render() {
		this.shadowRoot.innerHTML = `
			<style>
				:host{
					display: block;
					position: absolute;
					box-shadow: var(--win-shadow);
					border-radius: var(--win-corner-radius);
					overflow: hidden;
					background: var(--win-mica-bg);
					background-filter: blur(30px) saturate(180%);
					border: 1px solid rgba(255,255,255,0.4);
				}
				.title-bar{
					height: 32px;
					padding: 0 12px;
					display: flex;
					align-items: center;
					cursor: grab;
					user-select: none;
				}
				.title-bar:active{cursor: grabbing;}
				.content{padding: 16px;}
			</style>
			<div class="titlebar" id="handle">
				<slot name="title">Fluent Window</slot>
			</div>
			<div class="content"><slot></slot></div>
		`;
	}
	
	initDrag() {
		const handle = this.shadowRoot.getElementById('handle');
		handle.addEventListener("mousedown", (e) => {
			this.isDragging = true;
			this.offset = {x: e.clientX - this.offsetLeft, y: e.clientY - this.offsetTop};
		});
		
		document.addEventListener("mousemove", (e) => {
			if (!this.isDragging) return;
			this.style.left = `${e.clientX - this.offset.x}px`;
			this.style.top = `${e.clientY - this.offset.y}px`;
		});
		
		document.addEventListener("mouseup", () => {
			this.isDragging = false;
		});
	}
}

customElements.define("fluent-window", FluentWindow)