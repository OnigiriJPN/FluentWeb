export class FluentDialog extends HTMLElement {
	constructor() {
		super();
		this.attachShadow({ mode: "open" });
	}
	
	connectedCallback() {
		this.render();
	}
	
	render() {
		this.ShadowRoot.innerHTML = `
			<style>
				.overlay {
					position: fixed;
					top: 0; left: 0; width: 100%; height: 100%;
					background: rgba(0,0,0,0.2);
					display: flex;
					align-items: center;
					justify-content: center;
					backdrop-filter: blur(2px);
				}
				.dialog {
					background: var(--win-mica-bg);
					backdrop-filter: blur(30px) saturate(180%);
					border: 1px solid rgba(255,255,255,0.4);
					border-radius: 12px;
					padding: 24px;
					box-shadow: 0 16px 48px rgba(0,0,0,0.2);
					min-width: 300px;
				}
			</style>
			<div class="overlay">
				<div class="dialog">
					<slot></slot>
				</div>
			</div>
		`;
	}
}
customElements.define("fluent-dialog", FluentDialog);