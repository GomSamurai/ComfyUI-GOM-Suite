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
        padding: 8px;
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
        margin-bottom: 8px;
        border-bottom: 1px solid #2a0a0a;
        padding-bottom: 6px;
    }
    .gom-header-left {
        display: flex;
        align-items: center;
        gap: 6px;
    }
    .gom-logo {
        width: 16px;
        height: 16px;
        cursor: pointer;
        transition: transform 0.2s, filter 0.2s;
    }
    .gom-logo:hover {
        transform: scale(1.15);
        filter: drop-shadow(0 0 6px rgba(230, 57, 70, 0.6));
    }
    .gom-title {
        font-size: 0.85em;
        font-weight: 700;
        color: #e63946;
        text-transform: uppercase;
        letter-spacing: 1px;
    }
    
    .gom-options-box {
        background: rgba(20, 8, 8, 0.4);
        border: 1px solid #2a0a0a;
        border-radius: 6px;
        padding: 6px 8px;
        margin-bottom: 8px;
        display: flex;
        flex-direction: column;
    }
    .gom-options-grid {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 4px 8px;
    }
    .gom-options-section-title {
        font-size: 0.65em;
        color: #e63946;
        text-transform: uppercase;
        margin-top: 6px;
        margin-bottom: 4px;
        border-bottom: 1px solid #3a0f0f;
        padding-bottom: 2px;
        letter-spacing: 0.5px;
        font-weight: bold;
    }
    .gom-options-section-title:first-child {
        margin-top: 0;
    }
    .gom-toggle-label {
        display: flex;
        align-items: center;
        font-size: 0.7em;
        color: #aaa;
        cursor: pointer;
        transition: color 0.2s;
    }
    .gom-toggle-label.full-width { grid-column: span 2; }
    .gom-toggle-label:hover { color: #fff; }
    .gom-toggle-label input[type="checkbox"] {
        margin-right: 6px;
        accent-color: #e63946;
        cursor: pointer;
    }

    .gom-slot {
        background: rgba(22, 22, 22, 0.9);
        border: 1px solid #252525;
        border-radius: 6px;
        padding: 6px;
        margin-bottom: 6px;
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
        padding: 4px 6px;
        border-radius: 4px;
        font-size: 0.75em;
        box-sizing: border-box;
        margin-bottom: 6px;
        transition: border-color 0.2s;
    }
    .gom-slot-input:focus {
        outline: none;
        border-color: #e63946;
    }
    
    .gom-button-row {
        display: flex;
        gap: 6px;
    }
    .gom-btn {
        flex: 1;
        padding: 5px 0;
        border: none;
        border-radius: 4px;
        font-weight: 600;
        font-size: 0.7em;
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
        font-size: 1em;
    }
    .gom-btn-render:hover { background: linear-gradient(180deg, #4a3c1c 0%, #3a2a15 100%); border-color: #f39c12; color: #fff; }
    .gom-btn-render:active { transform: scale(0.97); }

    .gom-slot-header { display: flex; align-items: center; gap: 6px; margin-bottom: 6px; }
    .gom-slot-input { flex: 1; margin-bottom: 0; }
    .gom-slot-led { width: 6px; height: 6px; border-radius: 50%; background: #333; box-shadow: 0 0 2px #000; flex-shrink: 0; transition: background 0.3s; }
    .gom-slot-led.led-on { background: #4caf50; box-shadow: 0 0 6px #4caf50; }
    .gom-icon-btn { background: none; border: none; font-size: 0.9em; cursor: pointer; opacity: 0.5; transition: 0.2s; padding: 2px; }
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
                if (this.properties.setting_layout === undefined) this.properties.setting_layout = true;
                if (this.properties.setting_visuals === undefined) this.properties.setting_visuals = true;
                if (this.properties.setting_camera === undefined) this.properties.setting_camera = true;
                if (this.properties.setting_groups === undefined) this.properties.setting_groups = true;

                // Create the DOM element wrapper
                const container = document.createElement("div");
                container.className = "gom-node-container";
                
                // Add the DOM widget to the node
                this.addDOMWidget("gom_ui", "html", container, { serialize: false });

                // Hook resize to ensure height matches the node. ComfyUI handles width natively.
                const onResize = this.onResize;
                this.onResize = function (size) {
                    if (onResize) onResize.apply(this, arguments);
                    if (container) {
                        // Keep the HTML box flush with the node bottom bounds (account for ~30px title bar)
                        container.style.height = Math.max(10, size[1] - 30) + "px";
                    }
                };

                const savePreset = (slotId) => {
                    const nameInput = container.querySelector('#gom-slot-name-' + slotId);
                    if(nameInput) this.properties['preset_name_' + slotId] = nameInput.value;

                    const state = { links: [], modes: {}, widgets: {}, nodes: {}, camera: null, groups: [] };

                    if (this.properties.setting_camera) {
                        if (app.canvas && app.canvas.ds) {
                            state.camera = {
                                offset: [...app.canvas.ds.offset],
                                scale: app.canvas.ds.scale
                            };
                        }
                    }

                    if (this.properties.setting_groups) {
                        if (app.graph && app.graph._groups) {
                            state.groups = app.graph._groups.map(g => {
                                return {
                                    title: g.title,
                                    bounding: [...g._bounding],
                                    color: g.color,
                                    font_size: g.font_size
                                };
                            });
                        }
                    }

                    if (this.properties.setting_cables || this.properties.setting_layout || this.properties.setting_visuals) {
                        for (const node of app.graph._nodes) {
                            state.nodes[node.id] = {
                                inputs: node.inputs ? JSON.parse(JSON.stringify(node.inputs)) : [],
                                outputs: node.outputs ? JSON.parse(JSON.stringify(node.outputs)) : [],
                                properties: node.properties ? JSON.parse(JSON.stringify(node.properties)) : {},
                                flags: node.flags ? JSON.parse(JSON.stringify(node.flags)) : {},
                                pos: node.pos ? [...node.pos] : undefined,
                                size: node.size ? [...node.size] : undefined,
                                color: node.color,
                                bgcolor: node.bgcolor,
                                shape: node.shape,
                                title: node.title
                            };
                        }
                    }

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
                    

                    this.properties['preset_' + slotId] = state;
                    app.graph.setDirtyCanvas(true, true);
                    
                    if (typeof updateLEDs === 'function') updateLEDs();

                    const btn = container.querySelector('#gom-save-' + slotId);
                    if (btn) {
                        btn.textContent = "✅ GUARDADO";
                        setTimeout(() => btn.textContent = "💾 GUARDAR", 1500);
                    }
                };

                const clearPreset = (slotId) => {
                    this.properties['preset_' + slotId] = { links: [], modes: {}, widgets: {}, nodes: {} };
                    if (typeof updateLEDs === 'function') updateLEDs();
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

                    if (this.properties.setting_camera && state.camera) {
                        if (app.canvas && app.canvas.ds) {
                            app.canvas.ds.offset = [...state.camera.offset];
                            app.canvas.ds.scale = state.camera.scale;
                            app.canvas.setDirty(true, true);
                        }
                    }

                    if (this.properties.setting_groups && state.groups) {
                        if (app.graph) {
                            // Limpiar los grupos existentes
                            while (app.graph._groups && app.graph._groups.length > 0) {
                                const g = app.graph._groups[0];
                                if (app.graph.remove) app.graph.remove(g);
                                else {
                                    const index = app.graph._groups.indexOf(g);
                                    if (index !== -1) app.graph._groups.splice(index, 1);
                                }
                            }

                            // Recrear los grupos guardados
                            for (const gData of state.groups) {
                                const group = new LiteGraph.LGraphGroup();
                                group.title = gData.title;
                                group._bounding = new Float32Array(gData.bounding);
                                group.color = gData.color;
                                group.font_size = gData.font_size;
                                app.graph.add(group);
                            }
                        }
                    }

                    if (state.nodes && (this.properties.setting_cables || this.properties.setting_layout || this.properties.setting_visuals)) {
                        for (const nodeId in state.nodes) {
                            const node = app.graph.getNodeById(nodeId);
                            if (node) {
                                if (this.properties.setting_protect_loaders && isLoader(node)) continue;
                                const nodeState = state.nodes[nodeId];
                                
                                if (this.properties.setting_cables) {
                                    if (nodeState.flags) node.flags = JSON.parse(JSON.stringify(nodeState.flags));
                                    if (nodeState.properties) node.properties = JSON.parse(JSON.stringify(nodeState.properties));
                                    
                                    if (nodeState.inputs) {
                                        node.inputs = JSON.parse(JSON.stringify(nodeState.inputs));
                                        node.inputs.forEach(inp => { if (inp) inp.link = null; });
                                    }
                                    if (nodeState.outputs) {
                                        node.outputs = JSON.parse(JSON.stringify(nodeState.outputs));
                                        node.outputs.forEach(out => { if (out) out.links = []; });
                                    }
                                }

                                if (this.properties.setting_layout) {
                                    if (nodeState.pos) node.pos = [...nodeState.pos];
                                    if (nodeState.size) node.size = [...nodeState.size];
                                }

                                if (this.properties.setting_visuals) {
                                    if (nodeState.color !== undefined) node.color = nodeState.color;
                                    if (nodeState.bgcolor !== undefined) node.bgcolor = nodeState.bgcolor;
                                    if (nodeState.shape !== undefined) node.shape = nodeState.shape;
                                    if (nodeState.title !== undefined) node.title = nodeState.title;
                                }
                            }
                        }
                    }

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

                const updateLEDs = () => {
                    for(let i=1; i<=this.properties.num_slots; i++) {
                        const led = container.querySelector('#gom-led-' + i);
                        if (led) {
                            const pState = this.properties['preset_' + i] || {};
                            const hasData = (pState.links && pState.links.length > 0) || 
                                            (pState.modes && Object.keys(pState.modes).length > 0) || 
                                            (pState.widgets && Object.keys(pState.widgets).length > 0) ||
                                            (pState.nodes && Object.keys(pState.nodes).length > 0) ||
                                            (pState.camera && pState.camera.offset) ||
                                            (pState.groups && pState.groups.length > 0);
                            led.className = `gom-slot-led ${hasData ? 'led-on' : 'led-off'}`;
                            led.title = hasData ? 'Tiene datos guardados' : 'Slot vacío';
                        }
                    }
                };

                const redrawUI = () => {
                    if (container.querySelector('.gom-header')) {
                        updateLEDs();
                        return;
                    }
                    
                    let slotsHTML = "";
                    for(let i=1; i<=this.properties.num_slots; i++) {
                        const presetName = this.properties['preset_name_' + i] || `Macro ${i}`;
                        const isLocked = this.properties['preset_locked_' + i] === true;

                        slotsHTML += `
                            <div class="gom-slot">
                                <div class="gom-slot-header">
                                    <div class="gom-slot-led" id="gom-led-${i}"></div>
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

                    container.innerHTML = `
                        <div class="gom-header">
                            <div class="gom-header-left">
                                <svg class="gom-logo" viewBox="0 0 100 100">
                                    <polygon points="50,5 95,25 95,75 50,95 5,75 5,25" fill="rgba(255,51,51,0.15)" stroke="#ff3333" stroke-width="8"/>
                                    <circle cx="50" cy="50" r="16" fill="#ff3333"/>
                                </svg>
                                <span class="gom-title">Configurator</span>
                            </div>
                        </div>
                        
                        <div class="gom-options-box">
                            <div class="gom-options-section-title">🔌 Conexiones y Estado</div>
                            <div class="gom-options-grid">
                                <label class="gom-toggle-label" title="Guarda y restaura las conexiones (cables) entre los nodos.">
                                    <input type="checkbox" id="gom-set-cables" ${this.properties.setting_cables ? 'checked' : ''}> Cables
                                </label>
                                <label class="gom-toggle-label" title="Guarda y restaura el estado de Mute/Bypass de los nodos.">
                                    <input type="checkbox" id="gom-set-bypass" ${this.properties.setting_bypass ? 'checked' : ''}> Mute/Bypass
                                </label>
                            </div>

                            <div class="gom-options-section-title">🎛️ Parámetros</div>
                            <div class="gom-options-grid">
                                <label class="gom-toggle-label" title="Guarda y restaura valores numéricos, samplers, seeds y selectores.">
                                    <input type="checkbox" id="gom-set-values" ${this.properties.setting_values ? 'checked' : ''}> Valores
                                </label>
                                <label class="gom-toggle-label" title="Guarda y restaura cuadros de texto como los Prompts de texto largo.">
                                    <input type="checkbox" id="gom-set-texts" ${this.properties.setting_texts ? 'checked' : ''}> Textos
                                </label>
                                <label class="gom-toggle-label full-width" title="Protege los modelos para evitar recargas lentas. Los Loaders se ignorarán.">
                                    <input type="checkbox" id="gom-set-loaders" ${this.properties.setting_protect_loaders ? 'checked' : ''}> 🛡️ Proteger Loaders
                                </label>
                            </div>

                            <div class="gom-options-section-title">🎨 Entorno Visual</div>
                            <div class="gom-options-grid">
                                <label class="gom-toggle-label" title="Guarda y restaura la posición y tamaño de los nodos.">
                                    <input type="checkbox" id="gom-set-layout" ${this.properties.setting_layout ? 'checked' : ''}> Posición
                                </label>
                                <label class="gom-toggle-label" title="Guarda y restaura la posición de la cámara y el zoom del lienzo.">
                                    <input type="checkbox" id="gom-set-camera" ${this.properties.setting_camera ? 'checked' : ''}> Cámara
                                </label>
                                <label class="gom-toggle-label" title="Guarda y restaura colores, estilos y títulos personalizados.">
                                    <input type="checkbox" id="gom-set-visuals" ${this.properties.setting_visuals ? 'checked' : ''}> Colores
                                </label>
                                <label class="gom-toggle-label" title="Guarda y restaura las cajas de grupo (Groups) y sus colores.">
                                    <input type="checkbox" id="gom-set-groups" ${this.properties.setting_groups ? 'checked' : ''}> Grupos
                                </label>
                            </div>
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
                    container.querySelector('#gom-set-layout').onchange = (e) => this.properties.setting_layout = e.target.checked;
                    container.querySelector('#gom-set-visuals').onchange = (e) => this.properties.setting_visuals = e.target.checked;
                    container.querySelector('#gom-set-camera').onchange = (e) => this.properties.setting_camera = e.target.checked;
                    container.querySelector('#gom-set-groups').onchange = (e) => this.properties.setting_groups = e.target.checked;

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
                            <p>Guarda y restaura estados completos de tu entorno (macros). Puedes elegir exactamente qué elementos se capturan o restauran:</p>
                            <ul>
                                <li><strong>🔌 Conexiones y Estado:</strong> Guarda los cables y los estados de Mute/Bypass.</li>
                                <li><strong>🎛️ Parámetros:</strong> Guarda valores numéricos y campos de texto (Prompts).</li>
                                <li><strong>🎨 Entorno Visual:</strong> Guarda la geometría (grupos, posición, colores) e incluso la navegación de la cámara por el lienzo.</li>
                                <li><strong>🛡️ Proteger Loaders:</strong> Ignora nodos de modelos para evitar recargas de VRAM al cambiar de macro.</li>
                            </ul>
                            <p><strong>Controles de cada Slot:</strong></p>
                            <ul>
                                <li><strong>🟢 LED:</strong> Verde si hay datos guardados, gris si está vacío.</li>
                                <li><strong>🔒 Candado:</strong> Bloquea el botón de guardar para no sobrescribir la macro.</li>
                                <li><strong>🗑️ Papelera:</strong> Vacía por completo la memoria del slot.</li>
                                <li><strong>⚡ Render:</strong> Carga la macro e inicia la generación al instante.</li>
                            </ul>
                            <button class="gom-info-close">ENTENDIDO</button>
                        `;
                        
                        overlay.appendChild(modal);
                        document.body.appendChild(overlay);
                        
                        modal.querySelector('.gom-info-close').onclick = () => overlay.remove();
                        overlay.onclick = (e) => { if(e.target === overlay) overlay.remove(); };
                    };

                    // Dynamically set node size to fit the HTML content perfectly, accounting for zoom
                    app.graph.setDirtyCanvas(true, true);
                    updateLEDs();
                };

                // Set a generous default size for the node when first created
                if (!this.size || this.size[0] < 100) {
                    this.size = [360, 520];
                }

                // Draw the UI for the first time
                redrawUI();

                // Hook onConfigure to redraw the UI after the node properties are loaded from a saved workflow
                const onConfigure = this.onConfigure;
                this.onConfigure = function(info) {
                    if (onConfigure) onConfigure.apply(this, arguments);
                    // Force a full redraw so it picks up the loaded this.properties (num_slots, names, etc.)
                    if (container) container.innerHTML = '';
                    redrawUI();
                };

                return r;
            };
        }
    }
});
