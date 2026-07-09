import { app } from "../../scripts/app.js";

// Global CSS for the DOM Widget
const style = document.createElement('style');
style.textContent = `
    .gom-node-container {
        font-family: 'Inter', 'Segoe UI', sans-serif;
        background-color: rgba(14, 14, 14, 0.95);
        border: 1px solid #3a0f0f;
        border-radius: 8px;
        color: #d0d0d0;
        padding: 10px;
        box-sizing: border-box;
        width: 100%;
        height: 100%;
        overflow-y: auto;
        display: flex;
        flex-direction: column;
        box-shadow: inset 0 0 15px rgba(255, 51, 51, 0.03);
    }
    .gom-node-container::-webkit-scrollbar { width: 4px; }
    .gom-node-container::-webkit-scrollbar-thumb { background: #3a0f0f; border-radius: 2px; }
    
    .gom-header {
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin-bottom: 10px;
        border-bottom: 1px solid #2a0a0a;
        padding-bottom: 8px;
    }
    .gom-header-left {
        display: flex;
        align-items: center;
        gap: 8px;
    }
    .gom-scale-controls {
        display: flex;
        gap: 4px;
    }
    .gom-scale-btn {
        background: transparent;
        border: 1px solid #4a1c1c;
        color: #e63946;
        border-radius: 4px;
        width: 20px;
        height: 20px;
        display: flex;
        align-items: center;
        justify-content: center;
        font-weight: bold;
        cursor: pointer;
        font-size: 14px;
        transition: all 0.2s;
        line-height: 1;
        padding: 0;
    }
    .gom-scale-btn:hover {
        background: #e63946;
        color: #fff;
        border-color: #e63946;
    }
    .gom-logo {
        width: 18px;
        height: 18px;
        cursor: pointer;
        transition: transform 0.2s, filter 0.2s;
    }
    .gom-logo:hover {
        transform: scale(1.15);
        filter: drop-shadow(0 0 6px rgba(230, 57, 70, 0.6));
    }
    .gom-title {
        font-size: 0.95em;
        font-weight: 700;
        color: #e63946;
        text-transform: uppercase;
        letter-spacing: 2px;
    }
    
    .gom-options-box {
        background: rgba(20, 8, 8, 0.4);
        border: 1px solid #2a0a0a;
        border-radius: 6px;
        padding: 8px 10px;
        margin-bottom: 10px;
        display: flex;
        flex-direction: column;
        gap: 6px;
    }
    .gom-toggle-label {
        display: flex;
        align-items: center;
        font-size: 0.75em;
        color: #aaa;
        cursor: pointer;
        transition: color 0.2s;
    }
    .gom-toggle-label:hover { color: #fff; }
    .gom-toggle-label input[type="checkbox"] {
        margin-right: 8px;
        accent-color: #e63946;
        transform: scale(1.1);
        cursor: pointer;
    }

    .gom-slot {
        background: rgba(22, 22, 22, 0.9);
        border: 1px solid #252525;
        border-radius: 6px;
        padding: 8px;
        margin-bottom: 8px;
        transition: border-color 0.2s, box-shadow 0.2s;
    }
    .gom-slot:hover {
        border-color: rgba(230, 57, 70, 0.4);
        box-shadow: 0 0 8px rgba(230, 57, 70, 0.1);
    }
    .gom-slot-input {
        width: 100%;
        background: #0a0a0a;
        border: 1px solid #333;
        color: #eee;
        padding: 6px 8px;
        border-radius: 4px;
        font-size: 0.8em;
        box-sizing: border-box;
        margin-bottom: 8px;
        transition: border-color 0.2s;
    }
    .gom-slot-input:focus {
        outline: none;
        border-color: #e63946;
    }
    
    .gom-button-row {
        display: flex;
        gap: 8px;
    }
    .gom-btn {
        flex: 1;
        padding: 6px 0;
        border: none;
        border-radius: 4px;
        font-weight: 600;
        font-size: 0.75em;
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 4px;
        transition: all 0.2s ease;
        color: #ddd;
        text-transform: uppercase;
        letter-spacing: 0.5px;
    }
    .gom-btn-save {
        background: linear-gradient(180deg, #3a1515 0%, #200808 100%);
        border: 1px solid #4a1c1c;
    }
    .gom-btn-save:hover:not(.disabled) { background: linear-gradient(180deg, #4a1c1c 0%, #3a1515 100%); border-color: #e63946; color: #fff; }
    .gom-btn-save:active:not(.disabled) { transform: scale(0.97); }
    .gom-btn-save.disabled { opacity: 0.3; cursor: not-allowed; filter: grayscale(1); pointer-events: none; }

    .gom-btn-load {
        background: linear-gradient(180deg, #15203a 0%, #081020 100%);
        border: 1px solid #1c2e4a;
    }
    .gom-btn-load:hover { background: linear-gradient(180deg, #1c2e4a 0%, #15203a 100%); border-color: #457b9d; color: #fff; }
    .gom-btn-load:active { transform: scale(0.97); }

    .gom-btn-render {
        flex: 0.3;
        background: linear-gradient(180deg, #3a2a15 0%, #201808 100%);
        border: 1px solid #4a3c1c;
        font-size: 1.1em;
    }
    .gom-btn-render:hover { background: linear-gradient(180deg, #4a3c1c 0%, #3a2a15 100%); border-color: #f39c12; color: #fff; }
    .gom-btn-render:active { transform: scale(0.97); }

    .gom-slot-header { display: flex; align-items: center; gap: 6px; margin-bottom: 8px; }
    .gom-slot-input { flex: 1; margin-bottom: 0; }
    .gom-slot-led { width: 8px; height: 8px; border-radius: 50%; background: #333; box-shadow: 0 0 2px #000; flex-shrink: 0; transition: background 0.3s; }
    .gom-slot-led.led-on { background: #4caf50; box-shadow: 0 0 6px #4caf50; }
    .gom-icon-btn { background: none; border: none; font-size: 1em; cursor: pointer; opacity: 0.5; transition: 0.2s; padding: 2px; }
    .gom-icon-btn:hover { opacity: 1; transform: scale(1.2); }

    .gom-controls {
        display: flex;
        justify-content: space-between;
        margin-top: auto;
        padding-top: 5px;
    }
    .gom-ctrl-btn {
        background: none;
        border: 1px solid #333;
        color: #777;
        padding: 4px 10px;
        border-radius: 4px;
        cursor: pointer;
        font-size: 0.7em;
        font-weight: bold;
        transition: all 0.2s;
    }
    .gom-ctrl-btn:hover {
        background: #1a1a1a;
        color: #ccc;
        border-color: #e63946;
    }

    /* Modal Styles */
    .gom-info-modal {
        position: fixed; top: 50%; left: 50%; transform: translate(-50%, -50%);
        background: rgba(14, 14, 14, 0.98); border: 1px solid #4a1c1c;
        border-radius: 8px; color: #d0d0d0; padding: 25px;
        box-shadow: 0 10px 40px rgba(0,0,0,0.9), inset 0 0 20px rgba(230, 57, 70, 0.05);
        z-index: 10000; width: 450px; font-family: 'Inter', 'Segoe UI', sans-serif;
    }
    .gom-info-overlay {
        position: fixed; top: 0; left: 0; width: 100vw; height: 100vh;
        background: rgba(0,0,0,0.6); z-index: 9999; backdrop-filter: blur(2px);
    }
    .gom-info-modal h2 { color: #e63946; margin-top: 0; border-bottom: 1px solid #2a0a0a; padding-bottom: 12px; font-size: 1.3em; text-transform: uppercase; letter-spacing: 1px; }
    .gom-info-modal p { font-size: 0.95em; line-height: 1.5; color: #bbb; margin-bottom: 12px; }
    .gom-info-modal ul { font-size: 0.9em; color: #aaa; margin-bottom: 20px; padding-left: 20px; line-height: 1.5; }
    .gom-info-modal li { margin-bottom: 8px; }
    .gom-info-modal strong { color: #e0e0e0; }
    .gom-info-close {
        display: block; width: 100%; padding: 12px; background: linear-gradient(180deg, #3a1515 0%, #200808 100%);
        border: 1px solid #4a1c1c; color: #fff; border-radius: 6px;
        font-weight: bold; cursor: pointer; text-align: center; margin-top: 10px; transition: 0.2s; letter-spacing: 1px;
    }
    .gom-info-close:hover { background: #e63946; border-color: #ff4444; }
`;
document.head.appendChild(style);

app.registerExtension({
    name: "GOM.Configurator",
    async beforeRegisterNodeDef(nodeType, nodeData, app) {
        if (nodeData.name === "GOM_Configurator") {
            const onNodeCreated = nodeType.prototype.onNodeCreated;
            nodeType.prototype.onNodeCreated = function () {
                const r = onNodeCreated ? onNodeCreated.apply(this, arguments) : undefined;
                
                // Remove native widgets generated by Python inputs to keep only HTML
                this.widgets = [];
                
                if (!this.properties) this.properties = {};
                if (this.properties.num_slots === undefined) this.properties.num_slots = 3;
                if (this.properties.setting_cables === undefined) this.properties.setting_cables = true;
                if (this.properties.setting_bypass === undefined) this.properties.setting_bypass = true;
                if (this.properties.setting_values === undefined) this.properties.setting_values = false;
                if (this.properties.setting_texts === undefined) this.properties.setting_texts = false;
                if (this.properties.setting_protect_loaders === undefined) this.properties.setting_protect_loaders = true;
                if (this.properties.zoom_scale === undefined) this.properties.zoom_scale = 0.85;

                // Create the DOM element wrapper
                const container = document.createElement("div");
                container.className = "gom-node-container";
                
                // Add the DOM widget to the node
                this.addDOMWidget("gom_ui", "html", container, { serialize: false });

                const savePreset = (slotId) => {
                    const nameInput = container.querySelector('#gom-slot-name-' + slotId);
                    if(nameInput) this.properties['preset_name_' + slotId] = nameInput.value;

                    const state = { links: [], modes: {}, widgets: {} };

                    if (this.properties.setting_cables) {
                        for (const linkId in app.graph.links) {
                            const link = app.graph.links[linkId];
                            if (link) state.links.push([link.id, link.origin_id, link.origin_slot, link.target_id, link.target_slot, link.type]);
                        }
                    }
                    if (this.properties.setting_bypass) {
                        for (const node of app.graph._nodes) {
                            state.modes[node.id] = node.mode;
                        }
                    }

                    if (this.properties.setting_values || this.properties.setting_texts) {
                        for (const node of app.graph._nodes) {
                            if (node.widgets) {
                                state.widgets[node.id] = {};
                                for (const w of node.widgets) {
                                    if (!w.name) continue;
                                    const isText = (typeof w.value === 'string' && w.type !== 'combo');
                                    if (isText && this.properties.setting_texts) {
                                        state.widgets[node.id][w.name] = w.value;
                                    } else if (!isText && this.properties.setting_values) {
                                        state.widgets[node.id][w.name] = w.value;
                                    }
                                }
                            }
                        }
                    }
                    

                    this.properties['preset_' + index] = state;
                    app.graph.setDirtyCanvas(true, true);
                    
                    const btn = document.getElementById('gom-save-' + index);
                    if (btn) {
                        btn.textContent = "✅ GUARDADO";
                        setTimeout(() => btn.textContent = "💾 GUARDAR", 1500);
                    }
                    redrawUI();
                };

                const clearPreset = (index) => {
                    this.properties['preset_' + index] = { links: [], modes: {}, widgets: {} };
                    redrawUI();
                };

                const loadPreset = (slotId) => {
                    const state = this.properties["preset_" + slotId];
                    if (!state) { 
                        alert("Este preset está vacío."); 
                        return; 
                    }

                    const isLoader = (node) => {
                        if (!node) return false;
                        const type = (node.type || "").toLowerCase();
                        const title = (node.title || "").toLowerCase();
                        return type.includes("loader") || type.includes("checkpoint") || type.includes("model") || type.includes("unet") ||
                               title.includes("loader") || title.includes("checkpoint") || title.includes("model");
                    };

                    if (this.properties.setting_cables && state.links) {
                        const existingLinks = Object.keys(app.graph.links);
                        for (const linkId of existingLinks) {
                            const link = app.graph.links[linkId];
                            if (!link) continue;
                            if (this.properties.setting_protect_loaders) {
                                const origin = app.graph.getNodeById(link.origin_id);
                                const target = app.graph.getNodeById(link.target_id);
                                if ((origin && isLoader(origin)) || (target && isLoader(target))) continue;
                            }
                            app.graph.removeLink(linkId);
                        }

                        for (const l of state.links) {
                            const origin_node = app.graph.getNodeById(l[1]);
                            const target_node = app.graph.getNodeById(l[3]);
                            if (origin_node && target_node) {
                                if (this.properties.setting_protect_loaders && (isLoader(origin_node) || isLoader(target_node))) continue;
                                origin_node.connect(l[2], target_node, l[4]);
                            }
                        }
                    }

                    if (this.properties.setting_bypass && state.modes) {
                        for (const nodeId in state.modes) {
                            const node = app.graph.getNodeById(nodeId);
                            if (node) {
                                if (this.properties.setting_protect_loaders && isLoader(node)) continue;
                                node.mode = state.modes[nodeId];
                            }
                        }
                    }

                    if ((this.properties.setting_values || this.properties.setting_texts) && state.widgets) {
                        for (const nodeId in state.widgets) {
                            const node = app.graph.getNodeById(nodeId);
                            if (node && node.widgets) {
                                if (this.properties.setting_protect_loaders && isLoader(node)) continue;
                                for (const w of node.widgets) {
                                    if (w.name && state.widgets[nodeId][w.name] !== undefined) {
                                        const isText = (typeof w.value === 'string' && w.type !== 'combo');
                                        if (isText && !this.properties.setting_texts) continue;
                                        if (!isText && !this.properties.setting_values) continue;
                                        
                                        w.value = state.widgets[nodeId][w.name];
                                    }
                                }
                            }
                        }
                    }

                    app.graph.setDirtyCanvas(true, true);
                    
                    // Visual feedback
                    const loadBtn = container.querySelector('#gom-load-' + slotId);
                    if (loadBtn) {
                        const originalText = loadBtn.innerHTML;
                        loadBtn.innerHTML = "✅ CARGADO";
                        setTimeout(() => loadBtn.innerHTML = originalText, 1500);
                    }
                };

                const redrawUI = () => {
                    if (container.querySelector('.gom-header')) return;
                    
                    let slotsHTML = "";
                    for(let i=1; i<=this.properties.num_slots; i++) {
                        const presetName = this.properties['preset_name_' + i] || `Macro ${i}`;
                        const isLocked = this.properties['preset_locked_' + i] === true;
                        
                        const pState = this.properties['preset_' + i] || {};
                        const hasData = (pState.links && pState.links.length > 0) || 
                                        (pState.modes && Object.keys(pState.modes).length > 0) || 
                                        (pState.widgets && Object.keys(pState.widgets).length > 0);

                        slotsHTML += `
                            <div class="gom-slot">
                                <div class="gom-slot-header">
                                    <div class="gom-slot-led ${hasData ? 'led-on' : 'led-off'}" title="${hasData ? 'Tiene datos guardados' : 'Slot vacío'}"></div>
                                    <input type="text" id="gom-slot-name-${i}" class="gom-slot-input" value="${presetName}" placeholder="Nombre del Preset ${i}">
                                    <button class="gom-icon-btn gom-btn-lock" id="gom-lock-${i}" title="Bloquear Guardado">${isLocked ? '🔒' : '🔓'}</button>
                                    <button class="gom-icon-btn gom-btn-clear" id="gom-clear-${i}" title="Borrar memoria del slot">🗑️</button>
                                </div>
                                <div class="gom-button-row">
                                    <button class="gom-btn gom-btn-save ${isLocked ? 'disabled' : ''}" id="gom-save-${i}">💾 GUARDAR</button>
                                    <button class="gom-btn gom-btn-load" id="gom-load-${i}">▶️ CARGAR</button>
                                    <button class="gom-btn gom-btn-render" id="gom-render-${i}" title="Cargar y Renderizar al instante">⚡</button>
                                </div>
                            </div>
                        `;
                    }

                    container.style.zoom = this.properties.zoom_scale;

                    container.innerHTML = `
                        <div class="gom-header">
                            <div class="gom-header-left">
                                <svg class="gom-logo" viewBox="0 0 100 100">
                                    <polygon points="50,5 95,25 95,75 50,95 5,75 5,25" fill="rgba(255,51,51,0.15)" stroke="#ff3333" stroke-width="8"/>
                                    <circle cx="50" cy="50" r="16" fill="#ff3333"/>
                                </svg>
                                <span class="gom-title">Configurator</span>
                            </div>
                            <div class="gom-scale-controls">
                                <button id="gom-scale-down" class="gom-scale-btn">-</button>
                                <button id="gom-scale-up" class="gom-scale-btn">+</button>
                            </div>
                        </div>
                        
                        <div class="gom-options-box">
                            <label class="gom-toggle-label" title="Guarda y restaura las conexiones (cables) entre los nodos.">
                                <input type="checkbox" id="gom-set-cables" ${this.properties.setting_cables ? 'checked' : ''}>
                                Cables (Conexiones)
                            </label>
                            <label class="gom-toggle-label" title="Guarda y restaura el estado de Mute/Bypass de los nodos.">
                                <input type="checkbox" id="gom-set-bypass" ${this.properties.setting_bypass ? 'checked' : ''}>
                                Estado Mute/Bypass
                            </label>
                            <label class="gom-toggle-label" title="Guarda y restaura valores numéricos, samplers, seeds y selectores.">
                                <input type="checkbox" id="gom-set-values" ${this.properties.setting_values ? 'checked' : ''}>
                                Parámetros y Valores
                            </label>
                            <label class="gom-toggle-label" title="Guarda y restaura cuadros de texto como los Prompts de texto largo.">
                                <input type="checkbox" id="gom-set-texts" ${this.properties.setting_texts ? 'checked' : ''}>
                                Textos (Prompts)
                            </label>
                            <label class="gom-toggle-label" title="Protege los modelos para evitar recargas lentas. Los Loaders se ignorarán.">
                                <input type="checkbox" id="gom-set-loaders" ${this.properties.setting_protect_loaders ? 'checked' : ''}>
                                🛡️ Proteger Loaders
                            </label>
                        </div>
                        
                        ${slotsHTML}

                        <div class="gom-controls">
                            <button class="gom-ctrl-btn" id="gom-btn-clear-all" title="Borrar la memoria de todos los slots">🧹 Limpiar Todo</button>
                            <div>
                                <button class="gom-ctrl-btn" id="gom-btn-remove">➖</button>
                                <button class="gom-ctrl-btn" id="gom-btn-add">➕</button>
                            </div>
                        </div>
                    `;

                    container.querySelector('#gom-set-cables').onchange = (e) => this.properties.setting_cables = e.target.checked;
                    container.querySelector('#gom-set-bypass').onchange = (e) => this.properties.setting_bypass = e.target.checked;
                    container.querySelector('#gom-set-values').onchange = (e) => this.properties.setting_values = e.target.checked;
                    container.querySelector('#gom-set-texts').onchange = (e) => this.properties.setting_texts = e.target.checked;
                    container.querySelector('#gom-set-loaders').onchange = (e) => this.properties.setting_protect_loaders = e.target.checked;

                    container.querySelector('#gom-btn-add').onclick = () => {
                        this.properties.num_slots++;
                        container.innerHTML = '';
                        redrawUI();
                    };
                    container.querySelector('#gom-btn-remove').onclick = () => {
                        if(this.properties.num_slots > 1) this.properties.num_slots--;
                        container.innerHTML = '';
                        redrawUI();
                    };
                    container.querySelector('#gom-btn-clear-all').onclick = () => {
                        for(let i=1; i<=this.properties.num_slots; i++) clearPreset(i);
                        container.innerHTML = '';
                        redrawUI();
                    };

                    for(let i=1; i<=this.properties.num_slots; i++) {
                        container.querySelector('#gom-save-'+i).onclick = () => {
                            if (!this.properties['preset_locked_' + i]) savePreset(i);
                        };
                        container.querySelector('#gom-load-'+i).onclick = () => loadPreset(i);
                        container.querySelector('#gom-render-'+i).onclick = () => {
                            loadPreset(i);
                            if (app.queuePrompt) app.queuePrompt(0);
                        };
                        container.querySelector('#gom-lock-'+i).onclick = () => {
                            this.properties['preset_locked_' + i] = !this.properties['preset_locked_' + i];
                            container.innerHTML = '';
                            redrawUI();
                        };
                        container.querySelector('#gom-clear-'+i).onclick = () => {
                            clearPreset(i);
                            container.innerHTML = '';
                            redrawUI();
                        };
                        container.querySelector('#gom-slot-name-'+i).onchange = (e) => {
                            this.properties['preset_name_' + i] = e.target.value;
                        };
                    }

                    container.querySelector('.gom-logo').onclick = () => {
                        const existingOverlay = document.getElementById('gom-info-overlay');
                        if (existingOverlay) existingOverlay.remove();
                        
                        const overlay = document.createElement('div');
                        overlay.id = 'gom-info-overlay';
                        overlay.className = 'gom-info-overlay';
                        
                        const modal = document.createElement('div');
                        modal.className = 'gom-info-modal';
                        modal.innerHTML = `
                            <h2>GOM Workflow Configurator</h2>
                            <p>Este nodo te permite guardar y restaurar estados completos de tu entorno de trabajo. Funciona como una memoria instantánea para tus macros o presets de configuración.</p>
                            <ul>
                                <li><strong>Cables:</strong> Guarda qué nodos están conectados entre sí.</li>
                                <li><strong>Mute/Bypass:</strong> Guarda el estado de encendido o silenciado de los nodos.</li>
                                <li><strong>Parámetros:</strong> Guarda los números, selectores y seeds de todos los nodos presentes.</li>
                                <li><strong>Textos:</strong> Guarda de forma independiente las cajas de texto grandes (ej. prompts de generación).</li>
                                <li><strong>🛡️ Proteger Loaders:</strong> Ignora automáticamente cualquier nodo que sirva para cargar modelos (Checkpoints, Unet, LoRAs, etc.) para evitar enormes tiempos de recarga de VRAM al cambiar de preset.</li>
                            </ul>
                            <p><strong>Cómo usar:</strong> Escribe un nombre para tu macro, ajusta las opciones globales superiores que te interesen, y pulsa 💾 GUARDAR. Para restaurar el estado en cualquier momento, pulsa ▶️ CARGAR.</p>
                            <button class="gom-info-close">ENTENDIDO</button>
                        `;
                        
                        overlay.appendChild(modal);
                        document.body.appendChild(overlay);
                        
                        modal.querySelector('.gom-info-close').onclick = () => overlay.remove();
                        overlay.onclick = (e) => { if(e.target === overlay) overlay.remove(); };
                    };

                    container.querySelector('#gom-scale-down').onclick = () => {
                        if (this.properties.zoom_scale > 0.5) {
                            this.properties.zoom_scale -= 0.1;
                            container.innerHTML = '';
                            redrawUI();
                        }
                    };
                    container.querySelector('#gom-scale-up').onclick = () => {
                        this.properties.zoom_scale += 0.1;
                        container.innerHTML = '';
                        redrawUI();
                    };

                    app.graph.setDirtyCanvas(true, true);
                };

                // Draw the UI for the first time
                redrawUI();

                // Set a generous default size for the node when first created
                this.size = [360, 520];

                return r;
            };
        }
    }
});
