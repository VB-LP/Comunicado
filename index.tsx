import { useState, useRef, useCallback } from "react";

const C={pri:"#0D47A1",dark:"#1e3a8a",mid:"#1976D2",light:"#e3f2fd",accent:"#00897b",gray:"#424242",grayL:"#616161",bg:"#f8f9fa",border:"#e0e0e0",white:"#fff"};
const COLORS_PALETTE=["#0D47A1","#1976D2","#00897b","#424242"];
const getColor=(i)=>COLORS_PALETTE[i%COLORS_PALETTE.length];

const STYLES=`
*{box-sizing:border-box;margin:0;padding:0}
body{font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;background:${C.bg};font-size:13px}
.app{min-height:100vh;display:flex;flex-direction:column}
.hdr{background:#ffffff;color:${C.dark};padding:10px 20px;display:flex;align-items:center;gap:10px;border-bottom:1px solid ${C.border}}
.hdr-logo{font-size:10px;font-weight:800;background:${C.pri};padding:4px 8px;border-radius:4px;color:#fff}
.hdr-t{font-size:13px;font-weight:700;color:${C.dark}}.hdr-s{font-size:9px;color:${C.grayL}}
.hdr-r{margin-left:auto;display:flex;gap:6px}
.hdr-btn{background:${C.pri};border:none;color:#fff;padding:5px 12px;border-radius:4px;font-size:9px;font-weight:600;cursor:pointer;font-family:inherit}
.hdr-btn:hover{background:${C.mid}}
.hdr-btn.o{background:transparent;border:1px solid ${C.border};color:${C.gray}}.hdr-btn.o:hover{background:${C.bg}}
.mn{display:flex;flex:1}
.sb{width:260px;min-width:260px;background:#f8f9fa;border-right:1px solid ${C.border};padding:12px;display:flex;flex-direction:column;gap:10px;overflow-y:auto;max-height:calc(100vh - 46px)}
.sl{font-size:8px;font-weight:700;letter-spacing:.8px;color:${C.grayL};text-transform:uppercase;margin-bottom:4px}
.fg{display:flex;flex-direction:column;gap:2px;margin-bottom:2px}
.fl{font-size:8px;font-weight:600;color:${C.gray}}
.fi,.fs{border:1px solid ${C.border};border-radius:3px;padding:3px 6px;font-size:9px;font-family:inherit;color:${C.dark};background:#ffffff;width:100%}
.fi:focus{outline:none;border-color:${C.pri};box-shadow:0 0 0 2px rgba(42,133,202,.12)}
.pt{padding:5px 7px;border-radius:4px;cursor:pointer;border:1px solid ${C.border};background:#ffffff;display:flex;align-items:center;justify-content:space-between;transition:all .1s}
.pt:hover{border-color:${C.pri};background:${C.bg}}.pt.on{border:2px solid ${C.pri};background:${C.light}}
.pt-t{font-size:9px;font-weight:600;color:${C.dark}}.pt-s{font-size:7px;color:${C.grayL}}
.pt-x{background:none;border:none;color:#dc2626;cursor:pointer;font-size:13px;font-weight:700}
.hr{border:none;border-top:1px solid ${C.border};margin:2px 0}
.ct{flex:1;display:flex;flex-direction:column;background:${C.bg}}
.tb{background:#fff;border-bottom:1px solid ${C.border};padding:6px 14px;font-size:9px;color:${C.gray}}
.tb b{color:${C.dark}}.tb-i{float:right}
.cv{flex:1;overflow-y:auto;padding:24px;display:flex;flex-direction:column;align-items:center;gap:20px}
.a4{width:794px;height:1123px;background:#fff;box-shadow:0 2px 12px rgba(0,0,0,.08);display:flex;flex-direction:column;border:1px solid #d4d9e0;overflow:hidden}
.a4-landscape{width:1194px;height:280px;background:#fff;box-shadow:0 2px 12px rgba(0,0,0,.08);display:flex;flex-direction:column;border:1px solid #d4d9e0;overflow:hidden;margin:20px auto}
.a4h{background:#0B1D3A;padding:6px 10px;display:flex;align-items:center;justify-content:space-between;border-bottom:1px solid #1A5CCC;cursor:pointer;position:relative}
.a4-landscape .a4h{padding:3px 5px;min-height:30px;font-size:10px}
.a4-landscape .a4b{padding:6px 10px;gap:3px;font-size:9px;line-height:1.4}
.a4h:hover{background:#0f2347}
.a4h-l{display:flex;align-items:center;gap:10px}
.a4h-logo{font-size:9px;font-weight:800;color:${C.pri};background:#fff;padding:3px 8px;border-radius:3px}
.a4h-co{font-size:12px;font-weight:700;color:#fff}
.a4h-dept{display:none}
.a4h-sep{width:1px;height:16px;background:rgba(255,255,255,.25);margin:0 2px}
.a4h-step{color:rgba(255,255,255,.6);font-size:8px;font-weight:600;letter-spacing:.3px}
.a4h-title{font-size:10px;font-weight:600;color:#fff;max-width:280px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}
.a4h-r{text-align:right}
.a4h-code{font-size:7px;font-weight:600;color:rgba(255,255,255,.85)}
.a4b{flex:1;padding:50px 32px;display:flex;flex-direction:column;gap:24px;overflow-y:auto}
.a4f{background:#f9fafb;border-top:1px solid ${C.border};padding:3px 10px;display:flex;align-items:center;justify-content:space-between;font-size:7px;color:${C.gray}}
.a4f strong{color:${C.dark}}

/* COMUNICADO FORMAT */
.comunicado{max-width:620px;width:100%;background:#fff;box-shadow:0 2px 12px rgba(0,0,0,.08);display:flex;flex-direction:column;border:1px solid #d4d9e0;margin-bottom:30px}
.comunicado .a4h{background:#0B1D3A;padding:12px 16px;border-bottom:2px solid #1A5CCC;cursor:pointer}
.comunicado .a4h-title{font-size:11px;font-weight:700}
.comunicado .a4b{padding:16px 20px;gap:10px}
.comunicado .a4f{padding:8px 16px;border-top:1px solid #e5e7eb;background:#fafbfc;font-size:9px}
.com-intro{font-size:11px;line-height:1.6;color:${C.dark};text-align:justify;padding:10px 14px;background:${C.light};border-left:3px solid ${C.pri};border-radius:0 4px 4px 0}
.com-cards{display:grid;grid-template-columns:repeat(3,1fr);gap:8px}
.com-card{border:1.5px solid ${C.border};border-radius:6px;padding:8px 10px;border-top:3px solid}
.com-card-icon{width:22px;height:22px;margin-bottom:6px}
.com-card-title{font-size:9px;font-weight:700;color:${C.dark};margin-bottom:3px}
.com-card-desc{font-size:9px;color:${C.gray};line-height:1.4;text-align:justify}

/* BLOCO WRAPPER - click to edit, delete on hover */
.bw{position:relative;border-radius:4px;cursor:pointer;transition:outline .1s;page-break-inside:avoid}
.bw:hover{outline:2px dashed ${C.pri}}
.bw:hover .bw-del{opacity:1}
.bw-del{position:absolute;top:3px;right:3px;opacity:0;background:#fee2e2;color:#dc2626;border:none;padding:2px 6px;border-radius:3px;font-size:10px;font-weight:700;cursor:pointer;transition:opacity .1s;z-index:5}

/* BLOCKS */
.bb-badge{display:inline-block;padding:2px 6px;border-radius:3px;font-size:7px;font-weight:700;letter-spacing:.4px;text-transform:uppercase;background:${C.pri};color:#fff;margin-bottom:4px}
.bb-title{font-size:13px;font-weight:700;color:${C.pri};border-bottom:1px solid ${C.pri};padding-bottom:2px;margin-bottom:3px}
.bb-text{font-size:11px;line-height:1.6;color:${C.gray};text-align:justify;white-space:pre-wrap;word-break:break-word}

/* Intro */
.b-greeting{font-size:12px;color:${C.gray};margin-bottom:4px;text-align:justify}

/* Destaque */
.b-hl{background:${C.light};border-left:2px solid ${C.pri};padding:6px 8px;border-radius:3px;text-align:justify}
.b-hl-t{font-size:12px;font-weight:700;color:${C.pri};margin-bottom:2px}

/* Aviso */
.b-warn{background:#fffbea;border:1px solid #ffe7b2;border-radius:3px;padding:6px 8px}
.b-warn-t{font-size:11px;font-weight:700;color:#d97706;margin-bottom:2px}

/* Info */
.b-info{background:#f0f7ff;border:1px solid #bfe3ff;border-radius:3px;padding:6px 8px}
.b-info-t{font-size:11px;font-weight:700;color:${C.pri};margin-bottom:2px}

/* Lista */
.b-bullet{display:flex;gap:7px;margin-bottom:6px}
.b-bullet-dot{color:${C.pri};font-weight:800;font-size:13px;line-height:1.4;flex-shrink:0}

/* Steps */
.bs-list{display:flex;flex-direction:column;gap:8px}
.bs-i{display:flex;gap:8px;align-items:flex-start}
.bs-n{width:16px;height:16px;min-width:16px;background:${C.pri};color:#fff;border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:7px;font-weight:700}
.bs-t{font-size:11px;color:${C.gray};line-height:1.5}

/* Image */
.bi{border-radius:4px;overflow:hidden;border:1px solid ${C.border}}
.bi-box{display:flex;align-items:center;justify-content:center;background:#f0f1f3;overflow:hidden;border-radius:8px}
.bi-box img{width:100%;height:100%;object-fit:cover;image-rendering:-webkit-optimize-contrast;image-rendering:high-quality}
.bi-empty{display:flex;flex-direction:column;align-items:center;gap:3px;color:${C.grayL};font-size:9px;padding:14px}
.bi-disc{font-size:7px;color:${C.gray};padding:5px 8px;background:#f9fafb;border-left:2px solid ${C.border};text-align:justify}

/* Image side */
.bside{display:grid;gap:10px;align-items:start}
.bside-img{border-radius:4px;background:#f0f1f3;display:flex;align-items:center;justify-content:center;border:1px solid ${C.border};overflow:hidden}
.bside-img img{width:100%;height:100%;object-fit:cover;image-rendering:-webkit-optimize-contrast;image-rendering:high-quality}
.bside-cap{font-size:7px;color:${C.grayL};font-style:italic;margin-top:2px}

/* Table */
.btbl{border-collapse:collapse;width:100%;font-size:9px;color:${C.dark}}
.btbl th{background:${C.dark};color:#fff;padding:5px 7px;font-size:8px;font-weight:600;border:1px solid #1E3A5F}
.btbl td{padding:5px 7px;border:1px solid ${C.border}}
.btbl tr:nth-child(even) td{background:#f9fafb}
.btbl td.hl{background:${C.light};color:${C.dark};font-weight:600;border-color:${C.pri}}
.btbl-disc{font-size:7px;color:${C.grayL};margin-top:3px;font-style:italic}

/* Flowchart */
.bflow-grid{display:grid;align-items:center;padding:12px 0;gap:4px}
.bflow-cell{display:flex;align-items:center;justify-content:center;min-width:100px}
.bflow-node{background:#fff;border:2.5px solid ${C.border};border-radius:8px;padding:8px 6px;font-size:8px;font-weight:700;color:${C.dark};text-align:center;width:100%;height:75px;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:3px;word-break:break-word;box-shadow:0 2px 8px rgba(0,0,0,0.06);overflow:hidden}
.bflow-icon{width:22px;height:22px;flex-shrink:0}
.bflow-text{flex:1;display:flex;align-items:center;justify-content:center;width:100%;overflow:hidden}
.bflow-arr{display:flex;align-items:center;justify-content:center;font-size:16px;font-weight:700;padding:0 2px;color:${C.mid}}

/* Tutorial / Passo a Passo */
.b-tut-grid{display:grid;gap:6px;width:100%}
.step-card{background:#f9fafb;border:1px solid ${C.border};border-radius:3px;padding:6px;display:flex;flex-direction:column;gap:4px;min-width:0}
.step-num{font-size:10px;font-weight:700;color:${C.pri};text-transform:uppercase;letter-spacing:.2px}
.step-img{background:#fff;border:1px solid ${C.border};border-radius:8px;overflow:hidden;display:flex;align-items:center;justify-content:center;width:100%;object-fit:cover}
.step-img img{width:100%;height:100%;object-fit:cover;display:block}
.step-title{font-size:11px;font-weight:700;color:${C.dark}}
.step-desc{font-size:10px;line-height:1.4;color:${C.gray};text-align:justify}

/* CTA */
.b-cta{background:${C.pri};padding:8px 10px;border-radius:4px;color:#fff}
.b-cta-t{font-size:9px;font-weight:700;margin-bottom:2px}
.b-cta-txt{font-size:8px;color:rgba(255,255,255,.85);line-height:1.3}

/* Assinatura */
.b-sig-msg{font-size:12px;color:${C.gray};margin-bottom:6px;line-height:1.5}
.b-sig-name{font-size:11px;font-weight:700;color:${C.dark}}
.b-sig-role{font-size:10px;color:${C.gray}}

/* Dica / Alert */
.bdica{background:${C.light};border-left:2px solid ${C.pri};padding:6px 8px;text-align:justify}
.bdica-h{font-size:10px;font-weight:700;color:${C.dark};text-transform:uppercase;letter-spacing:.1px;margin-bottom:2px}
.bdica-t{font-size:11px;color:${C.gray};line-height:1.4;text-align:justify}
.balert{border-left:2px solid;padding:6px 8px}
.balert.warning{border-color:#f59e0b;background:#fffbeb}
.balert.info{border-color:${C.pri};background:${C.light}}

/* Upload area */
.upload-drop{border:2px dashed ${C.pri};border-radius:6px;background:#f0f7ff;cursor:pointer;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:6px;padding:14px;transition:all .15s}
.upload-drop:hover{background:${C.light};border-color:${C.mid}}

/* RIGHT */
.sbr{width:230px;min-width:230px;background:#fff;border-left:1px solid ${C.border};padding:12px;display:flex;flex-direction:column;gap:10px;overflow-y:auto;max-height:calc(100vh - 46px)}
.bbtn{border:1px solid ${C.border};border-radius:4px;padding:5px 4px;cursor:pointer;background:#f9fafb;transition:all .1s;font-size:8px;font-weight:600;color:${C.gray};text-align:center;display:flex;align-items:center;gap:4px;justify-content:center}
.bbtn:hover{border-color:${C.pri};background:#f0f7ff}
.bei{padding:4px 6px;border-radius:3px;background:#f9fafb;border:1px solid ${C.border};font-size:9px;cursor:pointer;display:flex;align-items:center;justify-content:space-between}
.bei:hover{border-color:${C.pri}}
.bei-l{font-weight:600;color:${C.pri}}
.bei-a{display:flex;gap:2px}
.bei-a button{background:none;border:none;cursor:pointer;font-size:10px;color:${C.grayL};padding:0 2px}
.bei-a button:hover{color:${C.pri}}.bei-a button.del:hover{color:#dc2626}
.sr{display:flex;align-items:center;gap:5px}.sr input[type=range]{flex:1;accent-color:${C.pri};height:3px}
.btn{border:none;border-radius:4px;padding:5px 10px;font-size:10px;font-weight:600;cursor:pointer;font-family:inherit;width:100%}
.btn-p{background:${C.pri};color:#fff}.btn-p:hover{background:${C.mid}}
.btn-s{background:#fff;color:${C.pri};border:1px solid ${C.pri}}
.mo{position:fixed;inset:0;background:rgba(11,29,58,.45);display:flex;align-items:center;justify-content:center;z-index:100}
.mc{background:#fff;border-radius:4px;box-shadow:0 8px 24px rgba(0,0,0,.15);width:80%;max-width:300px;max-height:80vh;display:flex;flex-direction:column}
.mc-head{background:${C.dark};color:#fff;padding:6px 10px;border-bottom:1px solid ${C.pri};font-size:9px;font-weight:700;border-radius:4px 4px 0 0;display:flex;justify-content:space-between;align-items:center}
.mc-body{flex:1;overflow-y:auto;padding:8px;display:flex;flex-direction:column;gap:4px}
.mc-foot{padding:6px 10px;border-top:1px solid ${C.border};display:flex;gap:3px;justify-content:flex-end}
.mc-foot button{width:auto;padding:4px 12px;font-size:8px}
.mta{border:1px solid ${C.border};border-radius:3px;padding:4px 6px;font-size:8px;font-family:inherit;width:100%;resize:vertical;min-height:50px}
/* Rich text toolbar */
.rte-wrap{display:flex;flex-direction:column;gap:3px}
.rte-bar{display:flex;gap:2px;background:#f0f1f3;border:1px solid ${C.border};border-bottom:none;border-radius:4px 4px 0 0;padding:3px 4px}
.rte-btn{background:none;border:1px solid transparent;border-radius:3px;width:22px;height:22px;cursor:pointer;font-size:11px;font-weight:700;color:${C.gray};display:flex;align-items:center;justify-content:center;font-family:serif}
.rte-btn:hover{background:#fff;border-color:${C.border};color:${C.dark}}
.rte-btn.active{background:${C.light};border-color:${C.pri};color:${C.pri}}
.rte-area{border:1px solid ${C.border};border-radius:0 0 4px 4px;padding:6px 8px;font-size:10px;font-family:inherit;min-height:70px;resize:vertical;outline:none;white-space:pre-wrap;word-break:break-word;line-height:1.5}
.rte-area:focus{border-color:${C.pri};box-shadow:0 0 0 2px rgba(42,133,202,.12)}

/* Flow com ícones — SVG icons in circles */
.b-fli{display:flex;align-items:flex-start;gap:0;justify-content:center;padding:10px 0;flex-wrap:wrap}
.b-fli-item{display:flex;flex-direction:column;align-items:center;flex:1;min-width:90px;max-width:140px}
.b-fli-circle{width:64px;height:64px;border-radius:50%;background:${C.light};border:2px solid ${C.pri};display:flex;align-items:center;justify-content:center;margin-bottom:8px}
.b-fli-circle svg{width:28px;height:28px;stroke:${C.pri};stroke-width:1.8;fill:none;stroke-linecap:round;stroke-linejoin:round}
.b-fli-text{font-size:9px;color:${C.dark};font-weight:600;text-align:center;line-height:1.35;max-width:110px}
.b-fli-arr{display:flex;align-items:center;padding:0 2px;margin-top:20px}
.b-fli-arr svg{width:22px;height:22px;stroke:${C.pri};stroke-width:2;fill:none}

/* Funil — barras degradê + círculo */
.b-fun-rows{display:flex;flex-direction:column;gap:4px}
.b-fun-row{display:flex;align-items:center;gap:0}
.b-fun-num{width:34px;min-width:34px;height:34px;background:${C.dark};color:#fff;font-size:14px;font-weight:700;display:flex;align-items:center;justify-content:center;border-radius:2px 0 0 2px}
.b-fun-bar{height:34px;display:flex;align-items:center;padding:0 14px;font-size:11px;font-weight:600;color:#fff;border-radius:0 3px 3px 0;transition:width .3s}
.b-fun-circle{width:130px;height:130px;border-radius:50%;border:6px solid ${C.border};display:flex;align-items:center;justify-content:center;text-align:center;font-size:11px;font-weight:700;color:${C.dark};padding:14px;line-height:1.35;flex-shrink:0}

/* FAQ visual — pergunta e resposta em card */
.b-faq-wrap{display:grid;grid-template-columns:repeat(2,1fr);gap:10px;margin-bottom:12px}
.b-faq-card{border:1.5px solid ${C.pri};border-radius:6px;overflow:hidden;background:#fff}
.b-faq-head{background:${C.pri};padding:6px 12px;display:flex;align-items:center;gap:5px}
.b-faq-head-tag{color:#fff;font-size:10px;font-weight:800;line-height:1.1}
.b-faq-body{padding:12px 14px}
.b-faq-q2{font-size:11px;font-weight:700;color:${C.dark};margin-bottom:8px;line-height:1.5;text-align:justify}
.b-faq-a2{font-size:10.5px;color:${C.gray};line-height:1.7;text-align:justify}

/* Radial / circular — donut chart SVG */
.b-rad-wrap{display:flex;justify-content:center;padding:6px 0}
.b-rad-svg{overflow:visible}

/* KPIs / Números */
.b-kpi-title{font-size:16px;font-weight:800;color:${C.dark};line-height:1.35;margin-bottom:6px}
.b-kpi-desc{font-size:11px;color:${C.gray};line-height:1.6;text-align:justify;margin-bottom:12px}
.b-kpi-row{display:flex;gap:0}
.b-kpi-card{flex:1;text-align:center;padding:10px 8px;border-right:1.5px solid ${C.border}}
.b-kpi-card:last-child{border-right:none}
.b-kpi-num{font-size:28px;font-weight:800;color:${C.pri};line-height:1.1;margin-bottom:2px}
.b-kpi-label{font-size:10px;color:${C.gray};font-weight:400}

/* Depoimento / Quote */
.b-qt{background:${C.light};border-radius:14px;padding:22px 26px;position:relative}
.b-qt-mark{color:${C.pri};font-size:38px;line-height:1;margin-bottom:8px;font-weight:800;letter-spacing:-4px}
.b-qt-txt{font-size:12px;color:${C.dark};line-height:1.7;margin-bottom:26px;text-align:justify}
.b-qt-foot{display:flex;justify-content:space-between;align-items:flex-end;gap:12px}
.b-qt-name{font-size:12px;font-weight:800;color:${C.pri};line-height:1.2;margin-bottom:2px}
.b-qt-role{font-size:10px;color:${C.gray}}

/* Cards com ícones */
.b-cds-row{display:grid;gap:10px}
.b-cds-card{background:#fff;border:1px solid ${C.border};border-radius:4px;padding:8px 10px}
.b-cds-card.tinted{background:#F0F7FC}
.b-cds-ico{width:28px;height:28px;background:${C.pri};border-radius:6px;display:flex;align-items:center;justify-content:center;margin-bottom:4px}
.b-cds-ico svg{width:14px;height:14px;stroke:#fff;stroke-width:2;fill:none;stroke-linecap:round;stroke-linejoin:round}
.b-cds-t{font-size:12px;font-weight:700;color:${C.dark};margin-bottom:2px}
.b-cds-d{font-size:10px;color:${C.gray};line-height:1.5;margin-bottom:6px}
.b-cds-li{display:flex;gap:4px;align-items:flex-start;font-size:10px;color:${C.gray};margin-bottom:2px;line-height:1.2}
.b-cds-li svg{width:12px;height:12px;stroke:${C.pri};stroke-width:2.2;fill:none;flex-shrink:0;margin-top:0.5px}

/* Mapa Brasil */
.b-br-wrap{display:flex;justify-content:center;padding:6px 0}
.b-br-svg{max-width:100%;height:auto}
.b-br-legend{display:flex;gap:12px;justify-content:center;flex-wrap:wrap;font-size:9px;color:${C.gray};margin-top:6px}
.b-br-lg-dot{display:inline-block;width:10px;height:10px;border-radius:2px;margin-right:4px;vertical-align:middle}

.empty{text-align:center;padding:20px 10px;color:${C.grayL};font-size:10px}
@media print{.sb,.sbr,.hdr,.tb{display:none!important}.mn,.ct{display:block!important}.cv{padding:0!important;background:#fff!important;gap:0!important}.a4{width:210mm!important;height:297mm!important;box-shadow:none!important;margin:0!important;border:none!important}.a4h,.a4f{-webkit-print-color-adjust:exact;print-color-adjust:exact}@page{size:A4;margin:0}}
`;

const BLOCKS=[
  {id:"intro",name:"Introdução",icon:"👋",type:"intro"},
  {id:"desc",name:"Seção Texto",icon:"📝",type:"description"},
  {id:"etapas",name:"Etapas",icon:"📋",type:"etapas"},
  {id:"destaque",name:"Destaque",icon:"💎",type:"destaque"},
  {id:"img",name:"Imagem",icon:"🖼️",type:"image"},
  {id:"imgside",name:"Img+Texto",icon:"◧",type:"image_side"},
  {id:"table",name:"Tabela",icon:"▦",type:"table"},
  {id:"flow",name:"Fluxograma",icon:"→",type:"flowchart"},
  {id:"flowi",name:"Fluxo Ícones",icon:"📦",type:"flow_icons"},
  {id:"funnel",name:"Funil",icon:"▼",type:"funnel"},
  {id:"faq",name:"FAQ Visual",icon:"❓",type:"faq"},
  {id:"radial",name:"Diagrama Radial",icon:"◎",type:"radial"},
  {id:"kpi",name:"KPIs / Números",icon:"#",type:"kpi"},
  {id:"quote",name:"Depoimento",icon:"❞",type:"quote"},
  {id:"cards",name:"Cards Ícones",icon:"▤",type:"cards"},
  {id:"brmap",name:"Mapa Brasil",icon:"🗺",type:"brmap"},
  {id:"tut",name:"Passo a Passo",icon:"✓",type:"tutorial"},
  {id:"cta",name:"Ação",icon:"▶",type:"cta"},
  {id:"dica",name:"Dica",icon:"💡",type:"dica"},
  {id:"alert",name:"Alerta",icon:"⚠️",type:"alert"},
  {id:"sig",name:"Assinatura",icon:"✍",type:"assinatura"},
];

const uid=()=>Math.random().toString(36).substr(2,9);
const now=()=>new Date().toLocaleDateString("pt-BR",{day:"2-digit",month:"2-digit",year:"numeric",hour:"2-digit",minute:"2-digit"});

function defaults(t){
  switch(t){
    case"intro":return{greeting:"Prezados(as),",text:"Informamos que...",html:""};
    case"description":return{badge:"",title:"Título da Seção",html:"Conteúdo da seção..."};
    case"etapas":return{title:"Passos",steps:["Verificar pré-requisitos","Reunir recursos","Executar atividades","Conferir resultados","Documentar conclusão"]};
    case"destaque":return{title:"Destaque",html:"Texto do destaque..."};
    case"image":return{src:null,annotations:[],disclaimer:"Imagem meramente ilustrativa.",imgW:50,imgH:200,circular:false,align:"left"};
    case"image_side":return{src:null,sideLayout:"left",label:"Título do item",html:"Descrição...",caption:"",imgW:150,imgH:120,circular:false,align:"top"};
    case"table":return{layout:"full",cols:["Coluna 1","Coluna 2","Coluna 3"],rows:[["Dado A","Dado B","Dado C"],["Dado D","Dado E","Dado F"]],highlighted:{},align:{},sideText:"",disclaimer:"Fonte: Dados internos."};
    case"flowchart":return{flowLayout:"full",sideText:"",nodes:["Início","Etapa 1","Etapa 2","Etapa 3","Fim"]};
    case"flow_icons":return{title:"Fluxo do Processo",items:[{icon:"mail",text:"Cliente envia um e-mail"},{icon:"inbox",text:"HelpDesk recebe a solicitação"},{icon:"folder",text:"Chamado direcionado para a TAG"},{icon:"user",text:"Atendente reivindica o chamado"},{icon:"chat",text:"Atendimento realizado"},{icon:"check",text:"Chamado encerrado"}]};
    case"funnel":return{title:"Princípios Fundamentais",tip:"Cinco princípios éticos fundamentais",items:[{label:"Integridade"},{label:"Objetividade"},{label:"Competência profissional e zelo"},{label:"Confidencialidade"},{label:"Comportamento profissional"}]};
    case"faq":return{title:"Dúvidas Frequentes",tag:"E se...",items:[{q:"Estou trabalhando com um cliente que acredita que um possível trabalho para outro cliente é contra os seus interesses. Isso seria considerado um conflito de interesses?",a:"Esta é uma \"situação sensível\" e poderia se tornar um conflito de interesses. As situações sensíveis nunca devem ser ignoradas e cada um de nós tem a responsabilidade de buscar informações e resolver essas situações adequadamente."}]};
    case"radial":return{center:"RADAR",radLayout:"full",sideText:"",showBg:true,items:[{label:"Reconhecer o evento",icon:"check",bgColor:"#FCE8E6",bgText:""},{label:"Avaliar a situação",icon:"edit",bgColor:"#FFF3E0",bgText:""},{label:"Decidir o que fazer",icon:"bulb",bgColor:"#FFFDE7",bgText:""},{label:"Acordar o caminho a seguir",icon:"thumb",bgColor:"#F3E5F5",bgText:""},{label:"Relatar e comunicar",icon:"chat",bgColor:"#E8F5E9",bgText:""}]};
    case"kpi":return{title:"Mais de 25 anos de expertise no mercado de telecomunicações unindo a melhor qualidade e o melhor atendimento",html:"A Mundivox oferece as melhores soluções de conectividade para o mercado corporativo, com agilidade, excelência e suporte exclusivo prestado por equipe própria.",items:[{num:"13",label:"estados"},{num:"+6.000",label:"km de rede própria"},{num:"+25.000",label:"serviços"}]};
    case"quote":return{title:"Depoimento",text:"A Operadora Mundivox tem se mostrado uma parceira estratégica em nossas operações, especialmente no setor de saúde, onde a disponibilidade dos serviços é crucial.",name:"William Júnior",role:"Gerente de TI - Grupo Alliança"};
    case"cards":return{title:"Destaques",columns:3,items:[{icon:"chip",title:"Infraestrutura",desc:"Tecnologia e engenharia de ponta com infraestrutura própria e profissionais altamente capacitados.",bullets:["Atendimento personalizado","Custo zero com equipamentos e infraestrutura","Escolha ser administrador ou deixar com a gente"],tinted:true},{icon:"headset",title:"Atendimento",desc:"Agilidade, excelência operacional, atendimento exclusivo e equipes próprias.",bullets:["Equipe própria","Monitoramento proativo","Soluções customizadas"],tinted:false},{icon:"dollar",title:"Preço",desc:"O melhor custo-benefício do mercado, garantindo excelência e alta tecnologia por um preço justo.",bullets:["Excelência em serviços","Agilidade no atendimento","Melhor custo-benefício"],tinted:false}]};
    case"brmap":return{title:"Presença Nacional",subtitle:"Estados com atuação Mundivox",states:{"SP":"strong","RJ":"strong","MG":"strong","ES":"strong","PR":"strong","SC":"strong","RS":"strong","BA":"strong","PE":"strong","RN":"strong","MT":"light","GO":"light","DF":"light","MS":"light","TO":"light"},strongColor:"#1E7EC5",lightColor:"#8EC1E8",baseColor:"#D9DDE1",showLegend:true,strongLabel:"Cobertura total",lightLabel:"Cobertura parcial"};
    case"tutorial":return{title:"Passo a Passo",columns:3,steps:[{title:"Etapa 1",imageId:null,desc:"Descrição.",imgH:400},{title:"Etapa 2",imageId:null,desc:"Descrição.",imgH:400},{title:"Etapa 3",imageId:null,desc:"Descrição.",imgH:400}]};
    case"cta":return{title:"Ação",text:"Clique aqui para acessar o sistema."};
    case"dica":return{title:"Dica",html:"Mantenha o registro atualizado em tempo real."};
    case"alert":return{title:"Atenção",atype:"warning",html:"Verifique todos os campos obrigatórios."};
    case"assinatura":return{title:"Contato",name:"Nome Completo",role:"Cargo / Equipe",html:"Em caso de dúvidas, entre em contato com o setor responsável."};
    default:return{};
  }
}

export default function App(){
  const[doc,setDoc]=useState({company:"Mundivox",department:"Operações",responsible:"Nome do Responsável",version:"1.0.0",code:"MAN-001",format:"a4"});
  const[pages,setPages]=useState([{id:"p1",title:"Documento",blocks:[],at:new Date().toLocaleString("pt-BR")}]);const[pi,setPi]=useState(0);const[modal,setModal]=useState(null);const[editBlock,setEditBlock]=useState(null);
  const[images,setImages]=useState([]);const fileRef=useRef();
  const pg=pi!==null?pages[pi]:null;

  const addBlock=tmpl=>{if(!pg)return;const np=[...pages];np[pi].blocks.push({id:uid(),type:tmpl.type,c:defaults(tmpl.type)});setPages(np)};
  const delBlock=(e,bid)=>{e.stopPropagation();const np=[...pages];np[pi].blocks=np[pi].blocks.filter(b=>b.id!==bid);setPages(np)};
  const updateBlock=(bid,nc)=>{const np=[...pages];const b=np[pi].blocks.find(b=>b.id===bid);if(b)b.c={...b.c,...nc};setPages(np);setEditBlock(null)};
  const moveBlock=(bid,dir)=>{const np=[...pages];const bs=np[pi].blocks;const idx=bs.findIndex(b=>b.id===bid);const ni=idx+dir;if(ni<0||ni>=bs.length)return;[bs[idx],bs[ni]]=[bs[ni],bs[idx]];setPages(np)};
  const loadImgSrc=(file,cb)=>{const r=new FileReader();r.onload=ev=>cb(ev.target.result);r.readAsDataURL(file)};
  const handleFiles=e=>{Array.from(e.target.files).forEach(f=>{loadImgSrc(f,src=>setImages(p=>[...p,{id:uid(),src,name:f.name}]))})};
  const imgMap=new Map(images.map(i=>[i.id,i.src]));

  const handlePrint=()=>{const w=window.open('','_blank');if(!w)return;const h=document.querySelector('.cv');if(!h)return;w.document.write('<html><head><title>Manual '+doc.company+'</title><style>'+STYLES+'body{background:#fff}.a4{box-shadow:none!important;margin:0 auto 40px!important}</style></head><body>'+h.innerHTML+'</body></html>');w.document.close();setTimeout(()=>w.print(),400)};
  const exportHTML=()=>{const h=document.querySelector('.cv');if(!h)return;const html='<!DOCTYPE html><html><head><meta charset="UTF-8"><title>Manual '+doc.company+'</title><style>'+STYLES+'body{background:#fff;display:flex;justify-content:center;margin:20px}</style></head><body>'+h.innerHTML+'</body></html>';const blob=new Blob([html],{type:'text/html'});const url=URL.createObjectURL(blob);const a=document.createElement('a');a.href=url;a.download='manual-'+new Date().toISOString().split('T')[0]+'.html';a.click();URL.revokeObjectURL(url)};

  return(
    <><style>{STYLES}</style>
    <div className="app">
      <div className="hdr">
        <div className="hdr-logo">MUNDIVOX</div>
        <div><div className="hdr-t">Manual Builder</div></div>
        <div className="hdr-r">
          {pages.length>0&&<><button className="hdr-btn" onClick={handlePrint}>🖨️ Imprimir</button><button className="hdr-btn" onClick={exportHTML}>📥 HTML</button><button className="hdr-btn o" onClick={()=>{setPages([]);setPi(null)}}>Limpar</button></>}
          <button className="hdr-btn" style={{background:"#7c3aed",marginLeft:6}} onClick={()=>setModal("ai")}>✨ Gerar com IA</button>
        </div>
      </div>
      <div className="mn">
        <div className="sb">
          <div><div className="sl">Documento</div>
            {[["Empresa","company"],["Departamento","department"],["Responsável","responsible"]].map(([l,k])=>(<div className="fg" key={k}><div className="fl">{l}</div><input className="fi" value={doc[k]} onChange={e=>setDoc(d=>({...d,[k]:e.target.value}))}/></div>))}
            <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:3}}>
              <div className="fg"><div className="fl">Código</div><input className="fi" value={doc.code} onChange={e=>setDoc(d=>({...d,code:e.target.value}))}/></div>
              <div className="fg"><div className="fl">Versão</div><input className="fi" value={doc.version} onChange={e=>setDoc(d=>({...d,version:e.target.value}))}/></div>
            </div>
            <div className="fg"><div className="fl">Formato</div><select className="fs" value={doc.format} onChange={e=>setDoc(d=>({...d,format:e.target.value}))}><option value="a4">A4 — Procedimento</option><option value="comunicado">Comunicado — Web</option></select></div>
          </div>
          <div className="hr"/>
          <div><div className="sl">Imagens</div>
            <div className="upload-drop" onClick={()=>fileRef.current?.click()} onDragOver={e=>e.preventDefault()} onDrop={e=>{e.preventDefault();handleFiles({target:{files:e.dataTransfer.files}})}}>
              <input type="file" accept="image/*" multiple onChange={handleFiles} ref={fileRef} style={{display:"none"}}/>
              <div style={{fontSize:18}}>📷</div><div style={{fontSize:8,color:C.gray}}>Arraste, clique ou cole</div>
            </div>
            {images.length>0&&(<div style={{display:"flex",flexWrap:"wrap",gap:3,marginTop:5}}>{images.map(img=>(<div key={img.id} style={{position:"relative"}}><img src={img.src} alt="" style={{width:38,height:38,borderRadius:3,border:"1px solid "+C.border,objectFit:"cover"}}/><button onClick={()=>setImages(p=>p.filter(i=>i.id!==img.id))} style={{position:"absolute",top:-4,right:-4,background:"#dc2626",color:"#fff",border:"none",borderRadius:"50%",width:14,height:14,cursor:"pointer",fontSize:8,fontWeight:700,lineHeight:1}}>×</button></div>))}</div>)}
          </div>
        </div>

        <div className="ct">
          <div className="tb"><b>{doc.company}</b><span className="tb-i">{pg.blocks.length} bloco(s)</span></div>
          <div className="cv">
            {doc.format==="comunicado"?(()=>{const comTitle=pg.blocks.find(b=>b.type==="description")?.c?.title||doc.company;return(
              <div className="comunicado">
                <div className="a4h" onClick={()=>setModal("hdr")}>
                  <div style={{display:"flex",flexDirection:"column",gap:2}}>
                    <div style={{fontSize:10,color:"#7eb3e8",fontWeight:500,letterSpacing:"0.03em"}}>{doc.department}</div>
                    <div style={{fontSize:15,color:"#fff",fontWeight:700,letterSpacing:"0.01em"}}>{comTitle}</div>
                  </div>
                </div>
                <div className="a4b">
                  {pg.blocks.length===0?(<div className="empty" style={{flex:1,paddingTop:24}}><div style={{fontSize:20}}>📭</div>Adicione blocos pelo painel direito.</div>):(
                    pg.blocks.map((b,idx)=>{
                      if(b.type==="description")return(
                        <div key={b.id} className="bw" onClick={()=>setEditBlock(b)}>
                          <button className="bw-del" onClick={e=>delBlock(e,b.id)}>✕</button>
                          <div style={{fontSize:11,lineHeight:1.6,color:C.dark,textAlign:"justify"}}><HTML v={b.c.html} fallback={b.c.text} cls=""/></div>
                        </div>
                      );
                      if(b.type==="cards")return(
                        <div key={b.id} className="bw" onClick={()=>setEditBlock(b)}>
                          <button className="bw-del" onClick={e=>delBlock(e,b.id)}>✕</button>
                          <div className="com-cards" style={{gridTemplateColumns:`repeat(${b.c.columns||3},1fr)`}}>{b.c.items.map((it,i)=>{const icoSet={chip:<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="9" y="9" width="6" height="6"/><path d="M9 1v2M15 1v2M9 21v2M15 21v2M1 9h2M1 15h2M21 9h2M21 15h2"/></svg>,headset:<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 18v-6a9 9 0 0118 0v6"/><path d="M21 19a2 2 0 01-2 2h-1a2 2 0 01-2-2v-3a2 2 0 012-2h3z"/><path d="M3 19a2 2 0 002 2h1a2 2 0 002-2v-3a2 2 0 00-2-2H3z"/></svg>,dollar:<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6"/></svg>,check:<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="20 6 9 17 4 12"/></svg>,lock:<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0110 0v4"/></svg>,gear:<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-4 0v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06-.06a2 2 0 01-2.83-2.83l.06-.06A1.65 1.65 0 004.68 15a1.65 1.65 0 00-1.51-1H3a2 2 0 010-4h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 012.83-2.83l.06.06A1.65 1.65 0 009 4.68a1.65 1.65 0 001-1.51V3a2 2 0 014 0v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 2.83l-.06.06A1.65 1.65 0 0019.4 9a1.65 1.65 0 001.51 1H21a2 2 0 010 4h-.09a1.65 1.65 0 00-1.51 1z"/></svg>,bell:<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9M13.73 21a2 2 0 01-3.46 0"/></svg>,clock:<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg>,shield:<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>,mail:<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>,star:<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>,user:<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>,folder:<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 19a2 2 0 01-2 2H4a2 2 0 01-2-2V5a2 2 0 012-2h5l2 3h9a2 2 0 012 2z"/></svg>,alert:<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>};const color=getColor(i);return(<div key={i} className="com-card" style={{borderTopColor:color}}><div className="com-card-icon" style={{color}}>{icoSet[it.icon]||icoSet.star}</div><div className="com-card-title">{it.title}</div><div className="com-card-desc">{it.desc}</div></div>)})}</div>
                        </div>
                      );
                      return(
                        <div key={b.id} className="bw" onClick={()=>setEditBlock(b)}>
                          <button className="bw-del" onClick={e=>delBlock(e,b.id)}>✕</button>
                          <RB block={b} imgMap={imgMap} blockIndex={idx}/>
                        </div>
                      );
                    })
                  )}
                </div>
                <div className="a4f"><div>Responsável: <strong>{doc.responsible}</strong></div><div>Documento Interno</div></div>
              </div>
            )})():(
              <div className="a4">
                <div className="a4h" onClick={()=>setModal("hdr")} style={{position:"relative",zIndex:2}}>
                  <div className="a4h-l">
                    <div className="a4h-sep"/>
                  </div>
                  <div className="a4h-r"><div className="a4h-code">{doc.code}</div></div>
                </div>
                <div className="a4b">
                  {pg.blocks.length===0?(<div className="empty" style={{flex:1,paddingTop:80}}><div style={{fontSize:28}}>📭</div>Adicione blocos pelo painel direito.</div>):(
                    pg.blocks.map((b,idx)=>(
                      <div key={b.id} className="bw" onClick={()=>setEditBlock(b)}>
                        <button className="bw-del" onClick={e=>delBlock(e,b.id)}>✕</button>
                        <RB block={b} imgMap={imgMap} blockIndex={idx}/>
                      </div>
                    ))
                  )}
                </div>
                <div className="a4f"><div>Responsável: <strong>{doc.responsible}</strong></div><div>Documento Interno</div><div>Rev. {doc.version}</div></div>
              </div>
            )}
          </div>
        </div>

        <div className="sbr">
          {!pg?(<div className="empty">Selecione uma página.</div>):(
            <><div><div className="sl">Adicionar Bloco</div>
              <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:3}}>
                {BLOCKS.map(b=>(<div key={b.id} className="bbtn" onClick={()=>addBlock(b)}><span>{b.icon}</span>{b.name}</div>))}
              </div>
            </div>
            {pg.blocks.length>0&&(<div><div className="sl">Blocos</div>
              <div style={{display:"flex",flexDirection:"column",gap:3}}>
                {pg.blocks.map((b,i)=>(<div key={b.id} className="bei"><div className="bei-l" onClick={()=>setEditBlock(b)}>#{i+1} {b.type}</div><div className="bei-a"><button onClick={()=>moveBlock(b.id,-1)}>▲</button><button onClick={()=>moveBlock(b.id,1)}>▼</button><button className="del" onClick={e=>delBlock(e,b.id)}>×</button></div></div>))}
              </div>
            </div>)}</>
          )}
        </div>
      </div>
    </div>
    {modal==="hdr"&&<HdrModal doc={doc} setDoc={setDoc} pg={pg} pages={pages} pi={pi} setPages={setPages} onClose={()=>setModal(null)}/>}
    {modal==="ai"&&<AIModal format={doc.format} onClose={()=>setModal(null)} onGenerate={(newBlocks)=>{setPages(p=>{const np=[...p];np[0]={...np[0],blocks:[...np[0].blocks,...newBlocks]};return np});setModal(null)}}/>}
    {editBlock&&pg&&<EM block={editBlock} images={images} onClose={()=>setEditBlock(null)} onSave={nc=>updateBlock(editBlock.id,nc)}/>}
    </>
  );
}

function AIModal({onClose,onGenerate,format}){
  const isCom=format==="comunicado";
  const[input,setInput]=useState("");
  const[loading,setLoading]=useState(false);
  const[error,setError]=useState("");
  const[step,setStep]=useState("");

  const SYSTEM_COM=`Você é um gerador de comunicados internos para a Mundivox.

Retorne EXATAMENTE neste formato de texto, sem JSON, sem aspas especiais:

TITULO: Título relacionado ao tema do comunicado (ex: Validação de Deslocamento do Técnico)
INTRO: Prezados(as),
INTRO_CONT: a partir do dia [DATA] serão implementadas [MUDANÇA], com o objetivo de [OBJETIVO].
CARD_TITULO: Título do ajuste 1
CARD_DESC: Descrição curta do ajuste 1
CARD_ICON: check
CARD_TITULO: Título do ajuste 2
CARD_DESC: Descrição curta do ajuste 2
CARD_ICON: lock
ALERT: Texto do aviso (só se necessário, senão omita esta linha)
ASSINATURA_NOME: Mundivox
ASSINATURA_CARGO: Operações
ASSINATURA_MSG: Dúvidas? Contate o setor responsável.

REGRAS OBRIGATÓRIAS:
- TITULO: título curto relacionado ao tema (ex: "Validação de Deslocamento", "Novo Processo de Estoque") — NUNCA coloque o nome da empresa
- INTRO sempre: "Prezados(as)," (em linha própria)
- INTRO_CONT: "a partir do dia [DATA] serão implementadas [MUDANÇA], com o objetivo de [OBJETIVO]."
- Se o usuário NÃO mencionou data: calcule o PRÓXIMO DIA em formato DD/MM (exemplo: se hoje é 12/07, use 13/07)
- Se o usuário mencionou data: use EXATAMENTE a data fornecida
- NUNCA mude o padrão
- 2 a 4 pares CARD_TITULO/CARD_DESC/CARD_ICON
- ALERT é opcional
- Ícones: check, lock, gear, bell, clock, shield, mail, user, folder, alert
- Sem formatação especial, sem markdown, sem JSON`;

  const SYSTEM=`Você é um gerador de manuais operacionais para a Mundivox.

Retorne EXATAMENTE neste formato de texto, sem JSON, sem aspas especiais:

DESC_TITULO: Título da seção
DESC_HTML: Texto descritivo do procedimento em 2-3 frases curtas.
FLOW_TITULO: Fluxo do Processo
FLOW_NODE: Início
FLOW_NODE: Etapa 1
FLOW_NODE: Etapa 2
FLOW_NODE: Etapa 3
FLOW_NODE: Fim
CARDS_COLS: 2
CARD_TITULO: Título do card 1
CARD_DESC: Descrição do card 1
CARD_ICON: check
CARD_TITULO: Título do card 2
CARD_DESC: Descrição do card 2
CARD_ICON: lock
TUTORIAL_TITULO: Passo a Passo
STEP_TITULO: Passo 1
STEP_DESC: Descrição do passo 1
STEP_TITULO: Passo 2
STEP_DESC: Descrição do passo 2
FAQ_TITULO: Dúvidas Frequentes
FAQ_P: Pergunta 1?
FAQ_R: Resposta 1.
FAQ_P: Pergunta 2?
FAQ_R: Resposta 2.
ALERT: Texto do aviso importante (omita se não necessário)

REGRAS:
- Siga a ordem exata
- 4-7 FLOW_NODEs
- 2-4 pares CARD
- 2-5 pares STEP (imgH sempre 400)
- 2-4 pares FAQ
- ALERT é opcional
- Sem formatação especial, sem markdown, sem JSON`;

  const SYSTEM_A4_OLD_UNUSED=`removido`;

  const generate=async()=>{
    if(!input.trim())return;
    setLoading(true);setError("");setStep("Analisando o conteúdo...");
    try{
      setStep("Estruturando o manual...");
      const res=await fetch("https://api.anthropic.com/v1/messages",{
        method:"POST",
        headers:{"Content-Type":"application/json"},
        body:JSON.stringify({
          model:"claude-sonnet-4-6",
          max_tokens:4096,
          system:isCom?SYSTEM_COM:SYSTEM,
          messages:[{role:"user",content:input}]
        })
      });
      const data=await res.json();
      if(!data.content||!data.content[0]){throw new Error("Sem resposta da IA")}
      setStep("Montando o documento...");
      const raw=(data.content[0].text||"").trim();
      const lines=raw.split("\n").map(l=>l.trim()).filter(Boolean);

      const blocks=[];
      const get=(prefix,arr)=>{const l=arr.find(x=>x.startsWith(prefix+":"));return l?l.slice(prefix.length+1).trim():""};

      if(isCom){
        // Parsing do comunicado
        const titulo=get("TITULO",lines)||"Comunicado Interno";
        const intro=get("INTRO",lines);
        const introCont=get("INTRO_CONT",lines);
        const introFull=(intro&&introCont)?intro+"\n"+introCont:(intro||introCont||"");
        if(introFull)blocks.push({type:"description",c:{title:titulo,html:introFull}});
        const cards=[];let curCard={};
        lines.forEach(l=>{
          if(l.startsWith("CARD_TITULO:")){if(curCard.title)cards.push({...curCard});curCard={title:l.slice(12).trim(),desc:"",icon:"check"}}
          else if(l.startsWith("CARD_DESC:"))curCard.desc=l.slice(10).trim();
          else if(l.startsWith("CARD_ICON:"))curCard.icon=l.slice(10).trim();
        });
        if(curCard.title)cards.push(curCard);
        if(cards.length)blocks.push({type:"cards",c:{columns:Math.min(cards.length,3),items:cards.map(c=>({icon:c.icon||"check",title:c.title,desc:c.desc,tinted:false}))}});
        const alert=get("ALERT",lines);
        if(alert)blocks.push({type:"alert",c:{atype:"warning",html:alert}});
        const sigNome=get("ASSINATURA_NOME",lines)||"Mundivox";
        const sigCargo=get("ASSINATURA_CARGO",lines)||"Operações";
        const sigMsg=get("ASSINATURA_MSG",lines)||"Dúvidas? Contate o setor responsável.";
        blocks.push({type:"assinatura",c:{name:sigNome,role:sigCargo,html:sigMsg}});
      } else {
        // Parsing do manual
        const descTitulo=get("DESC_TITULO",lines);
        const descHtml=get("DESC_HTML",lines);
        if(descHtml)blocks.push({type:"description",c:{title:descTitulo||"Sobre este Procedimento",html:descHtml}});
        const flowTitulo=get("FLOW_TITULO",lines)||"Fluxo do Processo";
        const nodes=lines.filter(l=>l.startsWith("FLOW_NODE:")).map(l=>l.slice(10).trim());
        if(nodes.length)blocks.push({type:"flowchart",c:{flowLayout:"full",title:flowTitulo,nodes,sideText:""}});
        const cardsCols=parseInt(get("CARDS_COLS",lines)||"2");
        const cards=[];let curCard={};
        lines.forEach(l=>{
          if(l.startsWith("CARD_TITULO:")){if(curCard.title)cards.push({...curCard});curCard={title:l.slice(12).trim(),desc:"",icon:"check"}}
          else if(l.startsWith("CARD_DESC:"))curCard.desc=l.slice(10).trim();
          else if(l.startsWith("CARD_ICON:"))curCard.icon=l.slice(10).trim();
        });
        if(curCard.title)cards.push(curCard);
        if(cards.length)blocks.push({type:"cards",c:{title:"Destaques",columns:cardsCols,items:cards.map(c=>({icon:c.icon||"check",title:c.title,desc:c.desc,tinted:false}))}});
        const tutTitulo=get("TUTORIAL_TITULO",lines)||"Passo a Passo";
        const steps=[];let curStep={};
        lines.forEach(l=>{
          if(l.startsWith("STEP_TITULO:")){if(curStep.title)steps.push({...curStep});curStep={title:l.slice(12).trim(),desc:"",imgH:400}}
          else if(l.startsWith("STEP_DESC:"))curStep.desc=l.slice(10).trim();
        });
        if(curStep.title)steps.push(curStep);
        if(steps.length)blocks.push({type:"tutorial",c:{title:tutTitulo,steps}});
        const faqTitulo=get("FAQ_TITULO",lines)||"Dúvidas Frequentes";
        const faqs=[];let curFaq={};
        lines.forEach(l=>{
          if(l.startsWith("FAQ_P:")){if(curFaq.q)faqs.push({...curFaq});curFaq={q:l.slice(6).trim(),a:""}}
          else if(l.startsWith("FAQ_R:"))curFaq.a=l.slice(6).trim();
        });
        if(curFaq.q)faqs.push(curFaq);
        if(faqs.length)blocks.push({type:"faq",c:{title:faqTitulo,tag:"?",items:faqs.slice(0,4)}});
        const alert=get("ALERT",lines);
        if(alert)blocks.push({type:"alert",c:{atype:"warning",html:alert}});
      }

      if(!blocks.length)throw new Error("Sem conteúdo gerado");
      const newBlocks=blocks.map(b=>({
        id:Math.random().toString(36).slice(2),
        type:b.type,
        c:Object.assign({},defaults(b.type),b.c)
      }));
      onGenerate(newBlocks);
    }catch(e){
      setError(`Erro na geração: ${e.message}. Tente descrevendo o procedimento de forma mais clara e concisa.`);
      console.error("Gen error:",e);
    }finally{
      setLoading(false);setStep("");
    }
  };

  return(
    <div className="mo" onClick={!loading?onClose:undefined}>
      <div className="mc" style={{maxWidth:560,width:"90%"}} onClick={e=>e.stopPropagation()}>
        <div className="mc-head" style={{background:"#7c3aed",color:"#fff"}}>
          <span>✨ Gerar Manual com IA</span>
          {!loading&&<button className="mc-close" style={{color:"#fff"}} onClick={onClose}>×</button>}
        </div>
        <div className="mc-body">
          {!loading?(
            <>
              <div className="fg">
                <div className="fl">Cole um texto descrevendo o procedimento (máx 2000 caracteres)</div>
                <textarea className="mta" value={input} onChange={e=>{if(e.target.value.length<=2000)setInput(e.target.value)}}
                  style={{minHeight:180,fontSize:11,lineHeight:1.6,resize:"vertical"}}
                  placeholder={"Ex: Ativação de fibra óptica. Técnico verifica a CTO, realiza testes e libera o serviço."}
                  maxLength={2000}/>
                <div style={{fontSize:8,color:"#9ca3af",marginTop:4}}>{input.length}/2000 caracteres</div>
              </div>
              {error&&<div style={{background:"#fee2e2",color:"#dc2626",borderRadius:4,padding:"8px 10px",fontSize:10}}>{error}</div>}
              <div style={{fontSize:9,color:"#9ca3af",marginTop:6}}>Dica: quanto mais direto o texto, melhor o resultado.</div>
            </>
          ):(
            <div style={{display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",padding:"40px 20px",gap:14}}>
              <div style={{width:40,height:40,border:"3px solid #e5e7eb",borderTop:"3px solid #7c3aed",borderRadius:"50%",animation:"spin 1s linear infinite"}}/>
              <div style={{fontSize:12,color:"#6b7280",fontWeight:500}}>{step}</div>
              <style>{`@keyframes spin{to{transform:rotate(360deg)}}`}</style>
            </div>
          )}
        </div>
        {!loading&&(
          <div className="mc-foot">
            <button className="btn btn-s" onClick={onClose}>Cancelar</button>
            <button className="btn btn-p" style={{background:"#7c3aed"}} onClick={generate} disabled={!input.trim()}>✨ Gerar</button>
          </div>
        )}
      </div>
    </div>
  );
}

function HdrModal({doc,setDoc,pg,pages,pi,setPages,onClose}){const[t,setT]=useState(pg.title);return(<div className="mo" onClick={onClose}><div className="mc" onClick={e=>e.stopPropagation()}><div className="mc-head"><span>Editar Cabeçalho</span><button className="mc-close" onClick={onClose}>×</button></div><div className="mc-body"><div className="fg"><div className="fl">Título da Página</div><input className="fi" value={t} onChange={e=>setT(e.target.value)}/></div></div><div className="mc-foot"><button className="btn btn-s" onClick={onClose}>Cancelar</button><button className="btn btn-p" onClick={()=>{const np=[...pages];np[pi].title=t;setPages(np);onClose()}}>Salvar</button></div></div></div>)}

function RTE({label,value,onChange}){
  const ref=useRef();
  const exec=cmd=>document.execCommand(cmd,false,null);
  const onInput=()=>onChange(ref.current.innerHTML);
  return(
    <div className="fg">
      {label&&<div className="fl">{label}</div>}
      <div className="rte-wrap">
        <div className="rte-bar">
          <button className="rte-btn" title="Negrito" onMouseDown={e=>{e.preventDefault();exec("bold")}}><b>B</b></button>
          <button className="rte-btn" title="Itálico" onMouseDown={e=>{e.preventDefault();exec("italic")}}><i>I</i></button>
          <button className="rte-btn" title="Sublinhado" onMouseDown={e=>{e.preventDefault();exec("underline")}}><u>U</u></button>
          <div style={{width:1,background:C.border,margin:"2px 3px"}}/>
          <button className="rte-btn" title="Esquerda" onMouseDown={e=>{e.preventDefault();exec("justifyLeft")}}>⬛</button>
          <button className="rte-btn" title="Centro" onMouseDown={e=>{e.preventDefault();exec("justifyCenter")}}>▣</button>
          <button className="rte-btn" title="Direita" onMouseDown={e=>{e.preventDefault();exec("justifyRight")}}>⬜</button>
          <button className="rte-btn" title="Justificar" onMouseDown={e=>{e.preventDefault();exec("justifyFull")}}>≡</button>
          <div style={{width:1,background:C.border,margin:"2px 3px"}}/>
          <button className="rte-btn" title="Limpar" onMouseDown={e=>{e.preventDefault();exec("removeFormat")}}>✕</button>
        </div>
        <div ref={ref} className="rte-area" contentEditable suppressContentEditableWarning onInput={onInput} dangerouslySetInnerHTML={{__html:value||""}}/>
      </div>
    </div>
  );
}

function EM({block,images,onClose,onSave}){
  const[c,setC]=useState(JSON.parse(JSON.stringify(block.c)));const t=block.type;
  const u=(k,v)=>setC(p=>({...p,[k]:v}));
  return(
    <div className="mo" onClick={onClose}><div className="mc" onClick={e=>e.stopPropagation()} style={{maxWidth:560}}>
      <div className="mc-head"><span>Editar Bloco</span><button className="mc-close" onClick={onClose}>×</button></div>
      <div className="mc-body">
        {t==="intro"&&(<><div className="fg"><div className="fl">Saudação</div><input className="fi" value={c.greeting} onChange={e=>u("greeting",e.target.value)}/></div><RTE label="Texto" value={c.html||c.text} onChange={v=>u("html",v)}/></>)}
        {t==="description"&&(<><div className="fg"><div className="fl">Badge (vazio para ocultar)</div><input className="fi" value={c.badge} onChange={e=>u("badge",e.target.value)} placeholder="Ex: DESCRIÇÃO"/></div><div className="fg"><div className="fl">Título</div><input className="fi" value={c.title} onChange={e=>u("title",e.target.value)}/></div>{c.src&&(<div className="fg"><div className="fl">Imagem</div><div style={{border:"2px dashed "+C.border,borderRadius:6,padding:8,textAlign:"center",background:C.bg}}><img src={c.src} alt="" style={{maxWidth:"100%",maxHeight:80,borderRadius:4,objectFit:"contain"}}/><button className="btn btn-s" style={{marginTop:4,background:"#fee2e2",color:"#dc2626",width:"100%"}} onClick={()=>u("src",null)}>✕ Remover imagem</button></div></div>)}<div className="fg"><div className="fl"><button className="btn btn-s" onClick={()=>document.getElementById("desc-img-"+block.id)?.click()} style={{width:"100%"}}>{c.src?"📸 Trocar imagem":"📸 Adicionar imagem"}</button><input id={"desc-img-"+block.id} type="file" accept="image/*" style={{display:"none"}} onChange={e=>{const f=e.target.files[0];if(!f)return;const r=new FileReader();r.onload=ev=>u("src",ev.target.result);r.readAsDataURL(f)}}/></div></div><RTE label="Conteúdo" value={c.html||c.content} onChange={v=>u("html",v)}/></>)}
        {t==="etapas"&&(<div className="fg"><div className="fl">Passos (um por linha)</div><textarea className="mta" style={{minHeight:120}} value={c.steps.join("\n")} onChange={e=>u("steps",e.target.value.split("\n").filter(s=>s.trim()))}/></div>)}
        {t==="destaque"&&(<><div className="fg"><div className="fl">Título</div><input className="fi" value={c.title} onChange={e=>u("title",e.target.value)}/></div><RTE label="Texto" value={c.html||c.text} onChange={v=>u("html",v)}/></>)}
        {t==="image"&&(<><div className="fg"><div className="fl">Imagem</div><div style={{border:"2px dashed "+C.border,borderRadius:6,padding:10,textAlign:"center",cursor:"pointer",background:C.bg}} onClick={()=>document.getElementById("img-up-"+block.id)?.click()}><input id={"img-up-"+block.id} type="file" accept="image/*" style={{display:"none"}} onChange={e=>{const f=e.target.files[0];if(!f)return;const r=new FileReader();r.onload=ev=>u("src",ev.target.result);r.readAsDataURL(f)}}/>{c.src?<img src={c.src} alt="" style={{maxWidth:"100%",maxHeight:80,borderRadius:4,objectFit:"contain"}}/>:<div style={{fontSize:9,color:C.grayL}}>📷 Clique para selecionar imagem</div>}</div>{c.src&&<button className="btn btn-s" style={{marginTop:4,background:"#fee2e2",color:"#dc2626"}} onClick={()=>u("src",null)}>✕ Remover</button>}</div><div className="fg"><div className="fl">Alinhamento</div><select className="fs" value={c.align||"left"} onChange={e=>u("align",e.target.value)}><option value="left">Esquerda</option><option value="center">Centralizado</option><option value="right">Direita</option></select></div><div className="fg"><div className="fl">Disclaimer</div><input className="fi" value={c.disclaimer} onChange={e=>u("disclaimer",e.target.value)}/></div><div className="fg"><div className="fl">Largura: {c.imgW}%</div><div className="sr"><input type="range" min={30} max={100} value={c.imgW} onChange={e=>u("imgW",+e.target.value)}/></div></div><div className="fg"><div className="fl">Altura: {c.imgH}px</div><div className="sr"><input type="range" min={80} max={500} value={c.imgH} onChange={e=>u("imgH",+e.target.value)}/></div></div><div className="fg"><label style={{display:"flex",gap:6,alignItems:"center",fontSize:10,color:C.gray,cursor:"pointer"}}><input type="checkbox" checked={!!c.circular} onChange={e=>u("circular",e.target.checked)}/>Formato circular</label></div></>)}
        {t==="image_side"&&(<><div className="fg"><div className="fl">Imagem</div><div style={{border:"2px dashed "+C.border,borderRadius:6,padding:10,textAlign:"center",cursor:"pointer",background:C.bg}} onClick={()=>document.getElementById("imgs-up-"+block.id)?.click()}><input id={"imgs-up-"+block.id} type="file" accept="image/*" style={{display:"none"}} onChange={e=>{const f=e.target.files[0];if(!f)return;const r=new FileReader();r.onload=ev=>u("src",ev.target.result);r.readAsDataURL(f)}}/>{c.src?<img src={c.src} alt="" style={{maxWidth:"100%",maxHeight:80,borderRadius:4,objectFit:"contain"}}/>:<div style={{fontSize:9,color:C.grayL}}>📷 Clique para selecionar imagem</div>}</div>{c.src&&<button className="btn btn-s" style={{marginTop:4,background:"#fee2e2",color:"#dc2626"}} onClick={()=>u("src",null)}>✕ Remover</button>}</div><div className="fg"><div className="fl">Posição</div><select className="fs" value={c.sideLayout||"left"} onChange={e=>u("sideLayout",e.target.value)}><option value="left">Img esquerda + texto</option><option value="right">Texto + img direita</option></select></div><div className="fg"><div className="fl">Alinhamento vertical</div><select className="fs" value={c.align||"top"} onChange={e=>u("align",e.target.value)}><option value="top">Topo</option><option value="center">Centro</option><option value="bottom">Base</option></select></div><div className="fg"><div className="fl">Título</div><input className="fi" value={c.label} onChange={e=>u("label",e.target.value)}/></div><RTE label="Texto" value={c.html||c.content} onChange={v=>u("html",v)}/><div className="fg"><div className="fl">Legenda</div><input className="fi" value={c.caption} onChange={e=>u("caption",e.target.value)}/></div><div className="fg"><div className="fl">Largura: {c.imgW}px</div><div className="sr"><input type="range" min={80} max={350} value={c.imgW} onChange={e=>u("imgW",+e.target.value)}/></div></div><div className="fg"><div className="fl">Altura: {c.imgH}px</div><div className="sr"><input type="range" min={60} max={300} value={c.imgH} onChange={e=>u("imgH",+e.target.value)}/></div></div><div className="fg"><label style={{display:"flex",gap:6,alignItems:"center",fontSize:10,color:C.gray,cursor:"pointer"}}><input type="checkbox" checked={!!c.circular} onChange={e=>u("circular",e.target.checked)}/>Formato circular</label></div></>)}
        {t==="table"&&(<><div className="fg"><div className="fl">Layout</div><select className="fs" value={c.layout} onChange={e=>u("layout",e.target.value)}><option value="full">Página toda</option><option value="left">Tabela esquerda + texto</option><option value="right">Texto + tabela direita</option></select></div>{(c.layout==="left"||c.layout==="right")&&(<div className="fg"><div className="fl">Texto ao lado</div><textarea className="mta" value={c.sideText} onChange={e=>u("sideText",e.target.value)}/></div>)}<div className="fg"><div className="fl">Colunas (separar por |)</div><input className="fi" value={c.cols.join(" | ")} onChange={e=>u("cols",e.target.value.split("|").map(s=>s.trim()))}/></div><div className="fg"><div className="fl">Linhas (uma por linha, | separa colunas)</div><textarea className="mta" style={{minHeight:80}} value={c.rows.map(r=>r.join(" | ")).join("\n")} onChange={e=>u("rows",e.target.value.split("\n").filter(l=>l.trim()).map(l=>l.split("|").map(s=>s.trim())))}/></div><div className="fg"><div className="fl">Disclaimer</div><input className="fi" value={c.disclaimer} onChange={e=>u("disclaimer",e.target.value)}/></div></>)}
        {t==="flowchart"&&(<><div className="fg"><div className="fl">Layout</div><select className="fs" value={c.flowLayout||"full"} onChange={e=>u("flowLayout",e.target.value)}><option value="full">Linha toda</option><option value="left">Fluxo esquerda + texto</option><option value="right">Texto + fluxo direita</option></select></div>{(c.flowLayout==="left"||c.flowLayout==="right")&&(<div className="fg"><div className="fl">Texto ao lado</div><textarea className="mta" value={c.sideText||""} onChange={e=>u("sideText",e.target.value)}/></div>)}<div className="fg"><div className="fl">Etapas (uma por linha)</div><textarea className="mta" style={{minHeight:120}} value={c.nodes.join("\n")} onChange={e=>u("nodes",e.target.value.split("\n").filter(s=>s.trim()))}/></div></>)}
        {t==="flow_icons"&&(<><div className="fg"><div className="fl">Título</div><input className="fi" value={c.title} onChange={e=>u("title",e.target.value)}/></div>{c.items.map((it,i)=>(<div key={i} style={{display:"grid",gridTemplateColumns:"70px 1fr auto",gap:4,marginBottom:4,alignItems:"center"}}><select className="fs" value={it.icon} onChange={e=>{const ni=[...c.items];ni[i]={...ni[i],icon:e.target.value};u("items",ni)}}>{["mail","inbox","folder","user","chat","check","search","star","bell","lock","gear","file","phone","clock","shield","tool","globe","link","flag","bolt"].map(ic=><option key={ic} value={ic}>{ic}</option>)}</select><input className="fi" value={it.text} onChange={e=>{const ni=[...c.items];ni[i]={...ni[i],text:e.target.value};u("items",ni)}} placeholder="Texto"/><button style={{background:"#fee2e2",color:"#dc2626",border:"none",borderRadius:3,padding:"3px 7px",cursor:"pointer",fontWeight:700}} onClick={()=>u("items",c.items.filter((_,j)=>j!==i))}>×</button></div>))}<button className="btn btn-s" onClick={()=>u("items",[...c.items,{icon:"star",text:"Nova etapa"}])}>+ Adicionar</button></>)}
        {t==="funnel"&&(<><div className="fg"><div className="fl">Título</div><input className="fi" value={c.title} onChange={e=>u("title",e.target.value)}/></div><div className="fg"><div className="fl">Texto do círculo</div><input className="fi" value={c.tip} onChange={e=>u("tip",e.target.value)}/></div>{c.items.map((it,i)=>(<div key={i} style={{display:"grid",gridTemplateColumns:"1fr auto",gap:4,marginBottom:4,alignItems:"center"}}><input className="fi" value={it.label} onChange={e=>{const ni=[...c.items];ni[i]={...ni[i],label:e.target.value};u("items",ni)}} placeholder="Label"/><button style={{background:"#fee2e2",color:"#dc2626",border:"none",borderRadius:3,padding:"3px 7px",cursor:"pointer",fontWeight:700}} onClick={()=>u("items",c.items.filter((_,j)=>j!==i))}>×</button></div>))}<button className="btn btn-s" onClick={()=>u("items",[...c.items,{label:"Novo item"}])}>+ Adicionar</button></>)}
        {t==="faq"&&(<><div className="fg"><div className="fl">Texto da tag</div><input className="fi" value={c.tag||"E se..."} onChange={e=>u("tag",e.target.value)}/></div>{c.items.map((it,i)=>(<div key={i} style={{background:"#f9fafb",border:"1px solid "+C.border,borderRadius:4,padding:8,marginBottom:6}}><div style={{display:"flex",justifyContent:"space-between",marginBottom:4}}><span style={{fontSize:9,fontWeight:700,color:C.pri}}>Pergunta {i+1}</span><button style={{background:"#fee2e2",color:"#dc2626",border:"none",borderRadius:3,padding:"2px 6px",fontSize:8,fontWeight:700,cursor:"pointer"}} onClick={()=>u("items",c.items.filter((_,j)=>j!==i))}>Remover</button></div><div className="fg"><div className="fl">Pergunta</div><textarea className="mta" style={{minHeight:50}} value={it.q} onChange={e=>{const ni=[...c.items];ni[i]={...ni[i],q:e.target.value};u("items",ni)}}/></div><div className="fg"><div className="fl">Resposta</div><textarea className="mta" style={{minHeight:80}} value={it.a} onChange={e=>{const ni=[...c.items];ni[i]={...ni[i],a:e.target.value};u("items",ni)}}/></div></div>))}<button className="btn btn-s" onClick={()=>u("items",[...c.items,{q:"Nova pergunta?",a:"Resposta..."}])}>+ Adicionar pergunta</button></>)}
        {t==="radial"&&(<><div className="fg"><div className="fl">Layout</div><select className="fs" value={c.radLayout||"full"} onChange={e=>u("radLayout",e.target.value)}><option value="full">Centralizado</option><option value="left">Diagrama esquerda + texto</option><option value="right">Texto + diagrama direita</option></select></div>{(c.radLayout==="left"||c.radLayout==="right")&&(<div className="fg"><div className="fl">Texto ao lado</div><textarea className="mta" value={c.sideText||""} onChange={e=>u("sideText",e.target.value)}/></div>)}<div className="fg"><label style={{display:"flex",gap:6,alignItems:"center",fontSize:10,color:C.gray,cursor:"pointer"}}><input type="checkbox" checked={!!c.showBg} onChange={e=>u("showBg",e.target.checked)}/>Mostrar cores e texto de fundo</label></div><div className="fg"><div className="fl">Texto central</div><input className="fi" value={c.center} onChange={e=>u("center",e.target.value)}/></div>{c.items.map((it,i)=>(<div key={i} style={{background:"#f9fafb",border:"1px solid "+C.border,borderRadius:4,padding:8,marginBottom:6}}><div style={{display:"flex",justifyContent:"space-between",marginBottom:4}}><span style={{fontSize:9,fontWeight:700,color:C.pri}}>Seção {i+1}</span><button style={{background:"#fee2e2",color:"#dc2626",border:"none",borderRadius:3,padding:"2px 6px",fontSize:8,fontWeight:700,cursor:"pointer"}} onClick={()=>u("items",c.items.filter((_,j)=>j!==i))}>Remover</button></div><div style={{display:"grid",gridTemplateColumns:"90px 1fr",gap:4,marginBottom:4,alignItems:"center"}}><select className="fs" value={it.icon||"check"} onChange={e=>{const ni=[...c.items];ni[i]={...ni[i],icon:e.target.value};u("items",ni)}}>{["check","edit","bulb","thumb","chat","star","flag","shield","user","gear","bell","lock","file","phone","clock","tool","search","globe","link","bolt"].map(ic=><option key={ic} value={ic}>{ic}</option>)}</select><input className="fi" value={it.label} onChange={e=>{const ni=[...c.items];ni[i]={...ni[i],label:e.target.value};u("items",ni)}} placeholder="Label"/></div>{c.showBg&&(<><div className="fg"><div className="fl">Cor de fundo</div><input className="fi" type="color" value={it.bgColor||"#fff"} onChange={e=>{const ni=[...c.items];ni[i]={...ni[i],bgColor:e.target.value};u("items",ni)}}/></div><div className="fg"><div className="fl">Texto do fundo (opcional)</div><textarea className="mta" style={{minHeight:60}} value={it.bgText||""} onChange={e=>{const ni=[...c.items];ni[i]={...ni[i],bgText:e.target.value};u("items",ni)}} placeholder="Texto que aparece fora do diagrama"/></div></>)}</div>))}<button className="btn btn-s" onClick={()=>u("items",[...c.items,{label:"Novo item",icon:"star",bgColor:"#E0E0E0",bgText:""}])}>+ Adicionar seção</button></>)}
        {t==="kpi"&&(<><div className="fg"><div className="fl">Título</div><textarea className="mta" style={{minHeight:40}} value={c.title} onChange={e=>u("title",e.target.value)}/></div><RTE label="Descrição" value={c.html} onChange={v=>u("html",v)}/>{c.items.map((it,i)=>(<div key={i} style={{display:"grid",gridTemplateColumns:"80px 1fr auto",gap:4,marginBottom:4,alignItems:"center"}}><input className="fi" value={it.num} onChange={e=>{const ni=[...c.items];ni[i]={...ni[i],num:e.target.value};u("items",ni)}} placeholder="Número"/><input className="fi" value={it.label} onChange={e=>{const ni=[...c.items];ni[i]={...ni[i],label:e.target.value};u("items",ni)}} placeholder="Label"/><button style={{background:"#fee2e2",color:"#dc2626",border:"none",borderRadius:3,padding:"3px 7px",cursor:"pointer",fontWeight:700}} onClick={()=>u("items",c.items.filter((_,j)=>j!==i))}>×</button></div>))}<button className="btn btn-s" onClick={()=>u("items",[...c.items,{num:"0",label:"descrição"}])}>+ Adicionar KPI</button></>)}
        {t==="quote"&&(<><div className="fg"><div className="fl">Texto do depoimento</div><textarea className="mta" style={{minHeight:90}} value={c.text} onChange={e=>u("text",e.target.value)}/></div><div className="fg"><div className="fl">Nome</div><input className="fi" value={c.name} onChange={e=>u("name",e.target.value)}/></div><div className="fg"><div className="fl">Cargo / Empresa</div><input className="fi" value={c.role} onChange={e=>u("role",e.target.value)}/></div></>)}
        {t==="cards"&&(<><div className="fg"><div className="fl">Colunas por linha</div><select className="fs" value={c.columns} onChange={e=>u("columns",+e.target.value)}>{[1,2,3,4].map(n=><option key={n} value={n}>{n} col{n>1?"s":""}</option>)}</select></div>{c.items.map((it,i)=>(<div key={i} style={{background:"#f9fafb",border:"1px solid "+C.border,borderRadius:4,padding:8,marginBottom:6}}><div style={{display:"flex",justifyContent:"space-between",marginBottom:4}}><span style={{fontSize:9,fontWeight:700,color:C.pri}}>Card {i+1}</span><button style={{background:"#fee2e2",color:"#dc2626",border:"none",borderRadius:3,padding:"2px 6px",fontSize:8,fontWeight:700,cursor:"pointer"}} onClick={()=>u("items",c.items.filter((_,j)=>j!==i))}>Remover</button></div><div className="fg"><div className="fl">Ícone</div><select className="fs" value={it.icon} onChange={e=>{const ni=[...c.items];ni[i]={...ni[i],icon:e.target.value};u("items",ni)}}>{["chip","headset","dollar","mail","inbox","folder","user","chat","check","search","star","bell","lock","gear","file","phone","clock","shield","tool","globe","link","flag","bolt"].map(ic=><option key={ic} value={ic}>{ic}</option>)}</select></div><div className="fg"><div className="fl">Título</div><input className="fi" value={it.title} onChange={e=>{const ni=[...c.items];ni[i]={...ni[i],title:e.target.value};u("items",ni)}}/></div><div className="fg"><div className="fl">Descrição</div><textarea className="mta" style={{minHeight:50}} value={it.desc} onChange={e=>{const ni=[...c.items];ni[i]={...ni[i],desc:e.target.value};u("items",ni)}}/></div><div className="fg"><div className="fl">Bullets (um por linha)</div><textarea className="mta" style={{minHeight:60}} value={(it.bullets||[]).join("\n")} onChange={e=>{const ni=[...c.items];ni[i]={...ni[i],bullets:e.target.value.split("\n").filter(l=>l.trim())};u("items",ni)}}/></div><div className="fg"><div className="fl">Cor de fundo</div><div style={{display:"flex",gap:6,alignItems:"center"}}><input type="color" value={it.bgColor||"#ffffff"} onChange={e=>{const ni=[...c.items];ni[i]={...ni[i],bgColor:e.target.value,tinted:e.target.value!=="#ffffff"};u("items",ni)}} style={{width:32,height:28,padding:2,border:"1px solid "+C.border,borderRadius:4,cursor:"pointer"}}/><span style={{fontSize:9,color:C.grayL}}>{it.bgColor||"#ffffff"}</span><button style={{fontSize:8,padding:"2px 6px",background:"#f3f4f6",border:"1px solid "+C.border,borderRadius:3,cursor:"pointer"}} onClick={()=>{const ni=[...c.items];ni[i]={...ni[i],bgColor:"#ffffff",tinted:false};u("items",ni)}}>Limpar</button></div></div></div>))}<button className="btn btn-s" onClick={()=>u("items",[...c.items,{icon:"star",title:"Novo card",desc:"Descrição",bullets:[],tinted:false}])}>+ Adicionar card</button></>)}
        {t==="brmap"&&(<><div className="fg"><div className="fl">Título</div><input className="fi" value={c.title} onChange={e=>u("title",e.target.value)}/></div><div className="fg"><div className="fl">Subtítulo</div><input className="fi" value={c.subtitle} onChange={e=>u("subtitle",e.target.value)}/></div><div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:4}}><div className="fg"><div className="fl">Cor forte</div><input className="fi" type="color" value={c.strongColor} onChange={e=>u("strongColor",e.target.value)}/></div><div className="fg"><div className="fl">Cor clara</div><input className="fi" type="color" value={c.lightColor} onChange={e=>u("lightColor",e.target.value)}/></div></div><div className="fg"><div className="fl">Estados (clique para alternar: nenhum → forte → claro → nenhum)</div><div style={{display:"grid",gridTemplateColumns:"repeat(9,1fr)",gap:3,marginTop:4}}>{["AC","AL","AP","AM","BA","CE","DF","ES","GO","MA","MT","MS","MG","PA","PB","PR","PE","PI","RJ","RN","RS","RO","RR","SC","SP","SE","TO"].map(uf=>{const cur=c.states[uf];const bg=cur==="strong"?c.strongColor:cur==="light"?c.lightColor:"#f0f0f0";const fg=cur?"#fff":C.gray;return(<button key={uf} onClick={()=>{const ns={...c.states};if(!cur)ns[uf]="strong";else if(cur==="strong")ns[uf]="light";else delete ns[uf];u("states",ns)}} style={{background:bg,color:fg,border:"1px solid "+C.border,padding:"4px 2px",fontSize:9,fontWeight:700,cursor:"pointer",borderRadius:3}}>{uf}</button>)})}</div></div><div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:4}}><div className="fg"><div className="fl">Legenda forte</div><input className="fi" value={c.strongLabel} onChange={e=>u("strongLabel",e.target.value)}/></div><div className="fg"><div className="fl">Legenda clara</div><input className="fi" value={c.lightLabel} onChange={e=>u("lightLabel",e.target.value)}/></div></div><div className="fg"><label style={{display:"flex",gap:6,alignItems:"center",fontSize:10,color:C.gray,cursor:"pointer"}}><input type="checkbox" checked={!!c.showLegend} onChange={e=>u("showLegend",e.target.checked)}/>Mostrar legenda</label></div></>)}
        {t==="tutorial"&&(<><div className="fg"><div className="fl">Título</div><input className="fi" value={c.title} onChange={e=>u("title",e.target.value)}/></div><div className="fg"><div className="fl">Colunas por linha</div><select className="fs" value={c.columns} onChange={e=>u("columns",+e.target.value)}>{[1,2,3,4].map(n=><option key={n} value={n}>{n} col{n>1?"s":""}</option>)}</select></div>{c.steps.map((s,si)=>(<div key={si} style={{background:"#f9fafb",border:"1px solid "+C.border,borderRadius:4,padding:8,marginBottom:6}}><div style={{display:"flex",justifyContent:"space-between",marginBottom:4}}><span style={{fontSize:9,fontWeight:700,color:C.pri}}>Passo {si+1}</span><button style={{background:"#fee2e2",color:"#dc2626",border:"none",borderRadius:3,padding:"2px 6px",fontSize:8,fontWeight:700,cursor:"pointer"}} onClick={()=>{const ns=[...c.steps];ns.splice(si,1);u("steps",ns)}}>Remover</button></div><div className="fg"><div className="fl">Título</div><input className="fi" value={s.title} onChange={e=>{const ns=[...c.steps];ns[si]={...ns[si],title:e.target.value};u("steps",ns)}}/></div><div className="fg"><div className="fl">Altura img: {s.imgH}px</div><div className="sr"><input type="range" min={60} max={300} value={s.imgH} onChange={e=>{const ns=[...c.steps];ns[si]={...ns[si],imgH:+e.target.value};u("steps",ns)}}/></div></div><div className="fg"><div className="fl">Descrição</div><textarea className="mta" style={{minHeight:50}} value={s.desc} onChange={e=>{const ns=[...c.steps];ns[si]={...ns[si],desc:e.target.value};u("steps",ns)}}/></div></div>))}<button className="btn btn-s" style={{marginTop:4}} onClick={()=>u("steps",[...c.steps,{title:"Etapa "+(c.steps.length+1),imageId:null,desc:"Descrição.",imgH:120}])}>+ Adicionar passo</button></>)}
        {t==="cta"&&(<><div className="fg"><div className="fl">Título</div><input className="fi" value={c.title} onChange={e=>u("title",e.target.value)}/></div><RTE label="Texto" value={c.html||c.text} onChange={v=>u("html",v)}/></>)}
        {t==="dica"&&(<RTE label="Texto" value={c.html||c.text} onChange={v=>u("html",v)}/>)}
        {t==="alert"&&(<><div className="fg"><div className="fl">Tipo</div><select className="fs" value={c.atype} onChange={e=>u("atype",e.target.value)}><option value="warning">Atenção</option><option value="info">Informação</option></select></div><RTE label="Mensagem" value={c.html||c.text} onChange={v=>u("html",v)}/></>)}
        {t==="assinatura"&&(<><RTE label="Mensagem" value={c.html||c.msg} onChange={v=>u("html",v)}/><div className="fg"><div className="fl">Nome</div><input className="fi" value={c.name} onChange={e=>u("name",e.target.value)}/></div><div className="fg"><div className="fl">Cargo</div><input className="fi" value={c.role} onChange={e=>u("role",e.target.value)}/></div></>)}
      </div>
      <div className="mc-foot"><button className="btn btn-s" onClick={onClose}>Cancelar</button><button className="btn btn-p" onClick={()=>onSave(c)}>Salvar</button></div>
    </div></div>
  );
}

function HTML({v,fallback,cls}){return <div className={cls||"bb-text"} dangerouslySetInnerHTML={{__html:v||fallback||""}}/>}

function RB({block,imgMap,blockIndex}){
  const c=block.c;
  const blockColor=getColor(blockIndex||0);
  if(block.type==="intro")return(<div><div className="bb-title">{c.title||"Introdução"}</div><div className="b-greeting">{c.greeting}</div><HTML v={c.html} fallback={c.text} cls="bb-text"/></div>);
  if(block.type==="description")return(<div>{c.badge&&<div className="bb-badge">{c.badge}</div>}{c.src&&<div style={{display:"flex",gap:10,marginBottom:10,alignItems:"flex-start"}}><img src={c.src} alt="" style={{width:"40%",borderRadius:4,objectFit:"cover"}}/><div style={{flex:1}}><div className="bb-title">{c.title}</div><HTML v={c.html} fallback={c.content} cls="bb-text"/></div></div>}{!c.src&&<><div className="bb-title">{c.title}</div><HTML v={c.html} fallback={c.content} cls="bb-text"/></>}</div>);
  if(block.type==="etapas")return(<div><div className="bb-badge">ETAPAS</div><div className="bb-title">{c.title||"Como executar"}</div><div className="bs-list">{c.steps.map((s,i)=>(<div key={i} className="bs-i"><div className="bs-n" style={{background:blockColor,color:"#fff"}}>{i+1}</div><div className="bs-t">{s}</div></div>))}</div></div>);
  if(block.type==="destaque")return(<div className="b-hl"><HTML v={c.html} fallback={c.text} cls="bb-text"/></div>);
  if(block.type==="image"){const src=c.src||null;const cir=c.circular;const align=c.align||"left";const alignMap={left:{marginLeft:0,marginRight:"auto"},center:{margin:"0 auto"},right:{marginLeft:"auto",marginRight:0}};return(<div>{c.title&&<div className="bb-title">{c.title}</div>}<div className="bi" style={{width:`${c.imgW}%`,...alignMap[align],...(cir?{border:"none",borderRadius:0}:{})}}><div className="bi-box" style={{height:c.imgH,...(cir?{borderRadius:"50%",overflow:"hidden",aspectRatio:"1/1",width:c.imgH,margin:"0 auto",background:"#f0f1f3"}:{})}}>{src?<img src={src} alt="" style={cir?{width:"100%",height:"100%",objectFit:"cover"}:{}}/>:<div className="bi-empty"><div style={{fontSize:20,opacity:.3}}>🖼️</div>Sem imagem</div>}</div>{c.disclaimer&&!cir&&<div className="bi-disc">{c.disclaimer}</div>}{c.disclaimer&&cir&&<div style={{fontSize:8,color:C.gray,textAlign:"center",marginTop:6,fontStyle:"italic"}}>{c.disclaimer}</div>}</div></div>)}
  if(block.type==="image_side"){const src=c.src||null;const cir=c.circular;const align=c.align||"top";const alignMap={top:"flex-start",center:"center",bottom:"flex-end"};const imgCol=(<div><div className="bside-img" style={{width:c.imgW,height:cir?c.imgW:c.imgH,...(cir?{borderRadius:"50%",overflow:"hidden",border:"none"}:{})}}>{src?<img src={src} alt="" style={cir?{width:"100%",height:"100%",objectFit:"cover"}:{}}/>:<div style={{fontSize:20,opacity:.3}}>🖼️</div>}</div>{c.caption&&<div className="bside-cap" style={cir?{textAlign:"center"}:{}}>{c.caption}</div>}</div>);const txtCol=(<div><div className="bb-title" style={{borderBottom:"none",marginBottom:2,fontSize:10,color:C.pri}}>{c.label}</div><HTML v={c.html} fallback={c.content} cls="bb-text"/></div>);const r=c.sideLayout==="right";return(<div className="bside" style={{gridTemplateColumns:r?`1fr ${c.imgW}px`:`${c.imgW}px 1fr`,alignItems:alignMap[align]}}>{r?<>{txtCol}{imgCol}</>:<>{imgCol}{txtCol}</>}</div>)}
  if(block.type==="table"){const tbl=(<div><table className="btbl"><thead><tr>{c.cols.map((col,i)=><th key={i}>{col}</th>)}</tr></thead><tbody>{c.rows.map((row,ri)=><tr key={ri}>{row.map((cell,ci)=><td key={ci} className={(c.highlighted&&c.highlighted[ri]&&c.highlighted[ri][ci])?"hl":""} style={{textAlign:(c.align&&c.align[ri+"_"+ci])||"left"}}>{cell}</td>)}</tr>)}</tbody></table>{c.disclaimer&&<div className="btbl-disc">{c.disclaimer}</div>}</div>);if(c.layout==="full")return tbl;if(c.layout==="left")return(<div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10,alignItems:"start"}}>{tbl}<div className="bb-text">{c.sideText}</div></div>);return(<div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10,alignItems:"start"}}><div className="bb-text">{c.sideText}</div>{tbl}</div>)}
  if(block.type==="flowchart"){const icons={mail:<svg viewBox="0 0 24 24" fill="currentColor" style={{width:"100%",height:"100%",color:blockColor}}><rect x="2" y="4" width="20" height="16" rx="2"/><path d="M2 4l10 8 10-8" fill="none" stroke="currentColor" strokeWidth="1.5"/></svg>,check:<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{width:"100%",height:"100%",color:blockColor}}><path d="M22 11.08V12a10 10 0 11-5.93-9.14"/><path d="M22 4L12 14.01l-3-3"/></svg>,clock:<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{width:"100%",height:"100%",color:blockColor}}><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg>,alert:<svg viewBox="0 0 24 24" fill="currentColor" style={{width:"100%",height:"100%",color:blockColor}}><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/></svg>,send:<svg viewBox="0 0 24 24" fill="currentColor" style={{width:"100%",height:"100%",color:blockColor}}><path d="M16.6915026,12.4744748 L3.50612381,13.2599618 C3.19218622,13.2599618 3.03521743,13.4170592 3.03521743,13.5741566 L1.15159189,20.0151496 C0.8376543,20.8006365 0.99,21.89 1.77946707,22.52 C2.41,22.99 3.50612381,23.1 4.13399899,22.8429026 L21.714504,14.0454487 C22.6563168,13.5741566 23.1272231,12.6315722 22.9702544,11.6889879 L4.13399899,1.16346272 C3.34915502,0.9 2.40734225,0.9 1.77946707,1.4445487 C0.994623095,2.10604706 0.837654326,3.0486314 1.15159189,3.99321575 L3.03521743,10.4341088 C3.03521743,10.5912061 3.34915502,10.7483035 3.50612381,10.7483035 L16.6915026,11.5337905 C16.6915026,11.5337905 17.1624089,11.5337905 17.1624089,12.0051827 C17.1624089,12.4744748 16.6915026,12.4744748 16.6915026,12.4744748 Z"/></svg>,gear:<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{width:"100%",height:"100%",color:blockColor}}><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-4 0v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83-2.83l.06-.06A1.65 1.65 0 004.68 15a1.65 1.65 0 00-1.51-1H3a2 2 0 010-4h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 012.83-2.83l.06.06A1.65 1.65 0 009 4.68a1.65 1.65 0 001-1.51V3a2 2 0 014 0v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 2.83l-.06.06A1.65 1.65 0 0019.4 9a1.65 1.65 0 001.51 1H21a2 2 0 010 4h-.09a1.65 1.65 0 00-1.51 1z"/></svg>};const iconList=Object.values(icons);const n=c.nodes.length;const cols=c.nodes.map((_,i)=>i<n-1?"1fr 14px":"1fr").join(" ");const arrow=<svg viewBox="0 0 24 24" style={{stroke:blockColor,strokeWidth:2,fill:"none",strokeLinecap:"round"}}><path d="M5 12h14"/><path d="M12 5l7 7-7 7"/></svg>;const flowEl=(<div><div className="bb-title">{c.title||"Fluxo do Processo"}</div><div className="bflow-grid" style={{gridTemplateColumns:cols,gridAutoFlow:"dense"}}>{c.nodes.map((nd,i)=>{const items=[];if(i>0)items.push(<div key={i+"a"} className="bflow-arr">{arrow}</div>);const icon=iconList[i%iconList.length];items.push(<div key={i+"n"} className="bflow-cell"><div className="bflow-node" style={{borderColor:blockColor,borderLeftWidth:"2.5px",borderLeftColor:blockColor,background:`linear-gradient(to right, ${blockColor}05, #fff)`}}><div className="bflow-icon">{icon}</div><div className="bflow-text">{nd}</div></div></div>);return items})}</div></div>);const fl=c.flowLayout||"full";if(fl==="full")return flowEl;if(fl==="left")return(<div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10,alignItems:"start"}}>{flowEl}<div className="bb-text">{c.sideText}</div></div>);return(<div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10,alignItems:"start"}}><div className="bb-text">{c.sideText}</div>{flowEl}</div>)}
  if(block.type==="flow_icons"){
    const icons={mail:<svg viewBox="0 0 24 24"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="M2 4l10 8 10-8"/></svg>,inbox:<svg viewBox="0 0 24 24"><path d="M22 12l-4-8H6L2 12"/><path d="M2 12v6a2 2 0 002 2h16a2 2 0 002-2v-6"/><path d="M2 12h6l2 3h4l2-3h6"/></svg>,folder:<svg viewBox="0 0 24 24"><path d="M22 19a2 2 0 01-2 2H4a2 2 0 01-2-2V5a2 2 0 012-2h5l2 3h9a2 2 0 012 2z"/></svg>,user:<svg viewBox="0 0 24 24"><path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>,chat:<svg viewBox="0 0 24 24"><path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"/></svg>,check:<svg viewBox="0 0 24 24"><path d="M22 11.08V12a10 10 0 11-5.93-9.14"/><path d="M22 4L12 14.01l-3-3"/></svg>,search:<svg viewBox="0 0 24 24"><circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35"/></svg>,star:<svg viewBox="0 0 24 24"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>,bell:<svg viewBox="0 0 24 24"><path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 01-3.46 0"/></svg>,lock:<svg viewBox="0 0 24 24"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0110 0v4"/></svg>,gear:<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-4 0v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83-2.83l.06-.06A1.65 1.65 0 004.68 15a1.65 1.65 0 00-1.51-1H3a2 2 0 010-4h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 012.83-2.83l.06.06A1.65 1.65 0 009 4.68a1.65 1.65 0 001-1.51V3a2 2 0 014 0v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 2.83l-.06.06A1.65 1.65 0 0019.4 9a1.65 1.65 0 001.51 1H21a2 2 0 010 4h-.09a1.65 1.65 0 00-1.51 1z"/></svg>,file:<svg viewBox="0 0 24 24"><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><path d="M14 2v6h6"/></svg>,phone:<svg viewBox="0 0 24 24"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z"/></svg>,clock:<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg>,shield:<svg viewBox="0 0 24 24"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>,tool:<svg viewBox="0 0 24 24"><path d="M14.7 6.3a1 1 0 000 1.4l1.6 1.6a1 1 0 001.4 0l3.77-3.77a6 6 0 01-7.94 7.94l-6.91 6.91a2.12 2.12 0 01-3-3l6.91-6.91a6 6 0 017.94-7.94l-3.76 3.76z"/></svg>,globe:<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><path d="M2 12h20"/><path d="M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z"/></svg>,link:<svg viewBox="0 0 24 24"><path d="M10 13a5 5 0 007.54.54l3-3a5 5 0 00-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 00-7.54-.54l-3 3a5 5 0 007.07 7.07l1.71-1.71"/></svg>,flag:<svg viewBox="0 0 24 24"><path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z"/><line x1="4" y1="22" x2="4" y2="15"/></svg>,bolt:<svg viewBox="0 0 24 24"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/></svg>};
    const arrow=<svg viewBox="0 0 24 24" style={{width:22,height:22,stroke:blockColor,strokeWidth:2,fill:"none"}}><path d="M5 12h14"/><path d="M12 5l7 7-7 7"/></svg>;
    return(<div><div className="bb-title">{c.title}</div><div className="b-fli">{c.items.map((it,i)=>(<div key={i} style={{display:"flex",alignItems:"flex-start",flex:1,minWidth:0}}>{i>0&&<div className="b-fli-arr">{arrow}</div>}<div className="b-fli-item"><div className="b-fli-circle" style={{background:blockColor,color:"#fff"}}>{icons[it.icon]||icons.star}</div><div className="b-fli-text">{it.text}</div></div></div>))}</div></div>)}
  if(block.type==="funnel"){const n=c.items.length;const blues=["#0B1D3A","#1E5F99","#2A85CA","#5BA3D9","#8EC1E8"];return(<div><div className="bb-title">{c.title}</div><div style={{display:"flex",alignItems:"center",gap:14}}><div style={{flex:1}}><div className="b-fun-rows">{c.items.map((it,i)=>{const w=100-i*(40/Math.max(n-1,1));return(<div key={i} className="b-fun-row"><div className="b-fun-num">{i+1}</div><div className="b-fun-bar" style={{background:blues[i%blues.length],width:`${w}%`}}>{it.label}</div></div>)})}</div></div>{c.tip&&<div className="b-fun-circle">{c.tip}</div>}</div></div>)}
  if(block.type==="faq")return(<div><div className="bb-title">{c.title||"Dúvidas Frequentes"}</div><div className="b-faq-wrap">{c.items.slice(0,4).map((it,i)=>(<div key={i} className="b-faq-card"><div className="b-faq-head" style={{background:blockColor}}><div className="b-faq-head-tag">{c.tag||"E se..."}</div></div><div className="b-faq-body"><div className="b-faq-q2">{it.q}</div><div className="b-faq-a2">{it.a}</div></div></div>))}</div></div>);
  if(block.type==="radial"){const items=c.items||[];const n=items.length;if(!n)return null;
    const cx=250,cy=250,Router=240,Rmid=155,Rinner=95,Rcenter=75,Rbg=380,gap=6;
    const gapAo=gap/Router,gapAm=gap/Rmid;
    const blues=["#0B1D3A","#1E5F99","#2A85CA","#5BA3D9","#8EC1E8","#A3D0F0"];
    const darkerBlues=["#050D1F","#123D66","#1E5F99","#3D82BA","#6BA3D5","#7CB5DE"];
    const pol=(cx,cy,r,a)=>({x:cx+r*Math.cos(a),y:cy+r*Math.sin(a)});
    const arcPath=(cx,cy,R1,R2,start,end,gA)=>{const s=start+gA/2,e=end-gA/2;const la=e-s>Math.PI?1:0;const p1=pol(cx,cy,R1,s),p2=pol(cx,cy,R1,e),p3=pol(cx,cy,R2,e),p4=pol(cx,cy,R2,s);return`M${p1.x},${p1.y} A${R1},${R1},0,${la},1,${p2.x},${p2.y} L${p3.x},${p3.y} A${R2},${R2},0,${la},0,${p4.x},${p4.y} Z`};
    const icons={check:<path d="M8 12l3 3 5-6"/>,edit:<><path d="M12 20h9"/><path d="M16.5 3.5a2.121 2.121 0 013 3L7 19l-4 1 1-4 12.5-12.5z"/></>,bulb:<><path d="M9 18h6"/><path d="M10 22h4"/><path d="M12 2a7 7 0 00-4 12.7c.6.5 1 1.3 1 2.3v1h6v-1c0-1 .4-1.8 1-2.3A7 7 0 0012 2z"/></>,thumb:<path d="M14 9V5a3 3 0 00-6 0v4H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2v-9a2 2 0 00-2-2h-5z"/>,chat:<path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"/>,star:<path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>,flag:<><path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z"/><line x1="4" y1="22" x2="4" y2="15"/></>,shield:<path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>,user:<><path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/><circle cx="12" cy="7" r="4"/></>,gear:<><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 01-2.83 2.83l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-4 0v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83-2.83l.06-.06A1.65 1.65 0 004.6 15a1.65 1.65 0 00-1.51-1H3a2 2 0 010-4h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 012.83-2.83l.06.06A1.65 1.65 0 009 4.6a1.65 1.65 0 001-1.51V3a2 2 0 014 0v.09A1.65 1.65 0 0015 4.6a1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 2.83l-.06.06a1.65 1.65 0 00-.33 1.82 1.65 1.65 0 001.51 1H21a2 2 0 010 4h-.09a1.65 1.65 0 00-1.51 1z"/></>,bell:<><path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 01-3.46 0"/></>,lock:<><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0110 0v4"/></>,file:<><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><path d="M14 2v6h6"/></>,phone:<path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z"/>,clock:<><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></>,tool:<path d="M14.7 6.3a1 1 0 000 1.4l1.6 1.6a1 1 0 001.4 0l3.77-3.77a6 6 0 01-7.94 7.94l-6.91 6.91a2.12 2.12 0 01-3-3l6.91-6.91a6 6 0 017.94-7.94l-3.76 3.76z"/>,search:<><circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35"/></>,globe:<><circle cx="12" cy="12" r="10"/><path d="M2 12h20"/><path d="M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z"/></>,link:<><path d="M10 13a5 5 0 007.54.54l3-3a5 5 0 00-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 00-7.54-.54l-3 3a5 5 0 007.07 7.07l1.71-1.71"/></>,bolt:<path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/>};
    // fundo em grid retangular + textos alinhados a cada zona
    const bgCols=Math.min(n,3),bgRows=Math.ceil(n/bgCols),bgCW=500/bgCols,bgCH=500/bgRows;
    const svgEl=(<svg viewBox="0 0 500 500" className="b-rad-svg" style={{maxWidth:360,maxHeight:360}}>
      <defs>
        {items.map((it,i)=>{const a=2*Math.PI/n;const start=-Math.PI/2+i*a;const end=-Math.PI/2+(i+1)*a;const midA=(start+end)/2;const flipped=midA>0&&midA<Math.PI;const tR=(Router+Rmid)/2;const gA=gapAo/2;const sA=flipped?end-gA:start+gA;const eA=flipped?start+gA:end-gA;const p1=pol(cx,cy,tR,sA);const p2=pol(cx,cy,tR,eA);const sweep=flipped?0:1;return(<path key={"tp"+i} id={`radtp-${block.id}-${i}`} d={`M${p1.x},${p1.y} A${tR},${tR},0,0,${sweep},${p2.x},${p2.y}`} fill="none"/>)})}
      </defs>
      {/* Fundo colorido em faixas retangulares */}
      {c.showBg&&items.map((it,i)=>{const col=i%bgCols,row=Math.floor(i/bgCols);return(<rect key={"bg"+i} x={col*bgCW} y={row*bgCH} width={bgCW} height={bgCH} fill={it.bgColor||"#fff"} opacity="0.45"/>)})}
      {/* Textos de fundo em linha reta, no canto de cada zona */}
      {c.showBg&&items.map((it,i)=>{if(!it.bgText)return null;const col=i%bgCols,row=Math.floor(i/bgCols);const px=col*bgCW+10;const py=row*bgCH+18;const lines=it.bgText.split("\n");return(<text key={"bt"+i} x={px} y={py} textAnchor="start" fontSize={10} fill={C.dark} fontWeight="600" style={{userSelect:"none"}}>{lines.map((ln,j)=>(<tspan key={j} x={px} dy={j===0?0:13}>{ln}</tspan>))}</text>)})}
      {/* Anéis do diagrama */}
      {items.map((it,i)=>{const a=2*Math.PI/n;const start=-Math.PI/2+i*a;const end=-Math.PI/2+(i+1)*a;const midA=(start+end)/2;
        const outerColor=blues[i%blues.length];
        const innerColor=darkerBlues[i%darkerBlues.length];
        const outerD=arcPath(cx,cy,Router,Rmid,start,end,gapAo);
        const innerD=arcPath(cx,cy,Rmid,Rinner,start,end,gapAm);
        const icR=(Rmid+Rinner)/2;
        const icP=pol(cx,cy,icR,midA);
        const icoSize=34;
        return(<g key={i}>
          <path d={outerD} fill={outerColor}/>
          <path d={innerD} fill={innerColor}/>
          <text fontSize={16} fontWeight="700" fill="#fff" style={{userSelect:"none"}}>
            <textPath href={`#radtp-${block.id}-${i}`} startOffset="50%" textAnchor="middle">
              {it.label.length>24?it.label.slice(0,22)+"…":it.label}
            </textPath>
          </text>
          <g transform={`translate(${icP.x-icoSize/2},${icP.y-icoSize/2})`}>
            <svg width={icoSize} height={icoSize} viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              {icons[it.icon]||icons.star}
            </svg>
          </g>
        </g>)
      })}
      <circle cx={cx} cy={cy} r={Rmid} fill="none" stroke="#fff" strokeWidth="2"/>
      <circle cx={cx} cy={cy} r={Rinner} fill="none" stroke="#fff" strokeWidth="2"/>
      <circle cx={cx} cy={cy} r={Rmid-8} fill="none" stroke={C.dark} strokeWidth="1" opacity="0.4"/>
      {items.map((_,i)=>{const a=2*Math.PI/n;const bd=-Math.PI/2+i*a;const dp=pol(cx,cy,Rmid-8,bd);return(<circle key={"d"+i} cx={dp.x} cy={dp.y} r="3" fill={C.dark} opacity="0.7"/>)})}
      <circle cx={cx} cy={cy} r={Rcenter} fill="#fff"/>
      <circle cx={cx} cy={cy} r={Rcenter} fill="none" stroke={C.border} strokeWidth="1"/>
      <text x={cx} y={cy} textAnchor="middle" dominantBaseline="middle" fontSize={22} fontWeight="800" fill={C.dark} letterSpacing="3">{c.center}</text>
    </svg>);
    const fl=c.radLayout||"full";
    if(fl==="full")return(<div className="b-rad-wrap">{svgEl}</div>);
    if(fl==="left")return(<div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:14,alignItems:"center"}}><div className="b-rad-wrap">{svgEl}</div><div className="bb-text">{c.sideText}</div></div>);
    return(<div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:14,alignItems:"center"}}><div className="bb-text">{c.sideText}</div><div className="b-rad-wrap">{svgEl}</div></div>)}
  if(block.type==="kpi")return(<div><div className="b-kpi-title">{c.title}</div><HTML v={c.html} cls="b-kpi-desc"/><div className="b-kpi-row">{c.items.map((it,i)=>(<div key={i} className="b-kpi-card"><div className="b-kpi-num">{it.num}</div><div className="b-kpi-label">{it.label}</div></div>))}</div></div>);
  if(block.type==="quote")return(<div>{c.title&&<div className="bb-title">{c.title}</div>}<div className="b-qt"><div className="b-qt-mark">❞</div><div className="b-qt-txt">{c.text}</div><div className="b-qt-foot"><div><div className="b-qt-name">{c.name}</div><div className="b-qt-role">{c.role}</div></div></div></div></div>);
  if(block.type==="cards"){
    const icoSet={chip:<svg viewBox="0 0 24 24"><rect x="4" y="4" width="16" height="16" rx="2"/><rect x="9" y="9" width="6" height="6"/><path d="M9 1v3M15 1v3M9 20v3M15 20v3M20 9h3M20 14h3M1 9h3M1 14h3"/></svg>,headset:<svg viewBox="0 0 24 24"><path d="M3 18v-6a9 9 0 0118 0v6"/><path d="M21 19a2 2 0 01-2 2h-1a2 2 0 01-2-2v-3a2 2 0 012-2h3v5zM3 19a2 2 0 002 2h1a2 2 0 002-2v-3a2 2 0 00-2-2H3v5z"/></svg>,dollar:<svg viewBox="0 0 24 24"><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6"/></svg>,mail:<svg viewBox="0 0 24 24"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="M2 4l10 8 10-8"/></svg>,inbox:<svg viewBox="0 0 24 24"><path d="M22 12l-4-8H6L2 12v6a2 2 0 002 2h16a2 2 0 002-2z"/></svg>,folder:<svg viewBox="0 0 24 24"><path d="M22 19a2 2 0 01-2 2H4a2 2 0 01-2-2V5a2 2 0 012-2h5l2 3h9a2 2 0 012 2z"/></svg>,user:<svg viewBox="0 0 24 24"><path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>,chat:<svg viewBox="0 0 24 24"><path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"/></svg>,check:<svg viewBox="0 0 24 24"><path d="M20 6L9 17l-5-5"/></svg>,search:<svg viewBox="0 0 24 24"><circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35"/></svg>,star:<svg viewBox="0 0 24 24"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>,bell:<svg viewBox="0 0 24 24"><path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9M13.73 21a2 2 0 01-3.46 0"/></svg>,lock:<svg viewBox="0 0 24 24"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0110 0v4"/></svg>,gear:<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 01-2.83 2.83l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-4 0v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83-2.83l.06-.06A1.65 1.65 0 004.6 15a1.65 1.65 0 00-1.51-1H3a2 2 0 010-4h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 012.83-2.83l.06.06A1.65 1.65 0 009 4.6a1.65 1.65 0 001-1.51V3a2 2 0 014 0v.09A1.65 1.65 0 0015 4.6a1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 2.83l-.06.06a1.65 1.65 0 00-.33 1.82 1.65 1.65 0 001.51 1H21a2 2 0 010 4h-.09a1.65 1.65 0 00-1.51 1z"/></svg>,file:<svg viewBox="0 0 24 24"><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8zM14 2v6h6"/></svg>,phone:<svg viewBox="0 0 24 24"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72c.12.94.32 1.88.6 2.77a2 2 0 01-.45 2.11L8 9.91a16 16 0 006 6l1.31-1.31a2 2 0 012.11-.45c.89.28 1.83.48 2.77.6A2 2 0 0122 16.92z"/></svg>,clock:<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg>,shield:<svg viewBox="0 0 24 24"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>,tool:<svg viewBox="0 0 24 24"><path d="M14.7 6.3a1 1 0 000 1.4l1.6 1.6a1 1 0 001.4 0l3.77-3.77a6 6 0 01-7.94 7.94l-6.91 6.91a2.12 2.12 0 01-3-3l6.91-6.91a6 6 0 017.94-7.94l-3.76 3.76z"/></svg>,globe:<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><path d="M2 12h20M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z"/></svg>,link:<svg viewBox="0 0 24 24"><path d="M10 13a5 5 0 007.54.54l3-3a5 5 0 00-7.07-7.07l-1.72 1.71M14 11a5 5 0 00-7.54-.54l-3 3a5 5 0 007.07 7.07l1.71-1.71"/></svg>,flag:<svg viewBox="0 0 24 24"><path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1zM4 22V15"/></svg>,bolt:<svg viewBox="0 0 24 24"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/></svg>};
    const chk=<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><path d="M8 12l3 3 5-6"/></svg>;
    return(<div className="b-cds-row" style={{gridTemplateColumns:`repeat(${c.columns},1fr)`}}>{c.items.map((it,i)=>(<div key={i} className="b-cds-card" style={{borderLeft:`4px solid ${blockColor}`,background:it.bgColor||"#fff"}}><div className="b-cds-ico" style={{background:blockColor,color:"#fff"}}>{icoSet[it.icon]||icoSet.star}</div><div className="b-cds-t">{it.title}</div><div className="b-cds-d">{it.desc}</div>{(it.bullets||[]).map((b,j)=>(<div key={j} className="b-cds-li">{chk}<span>{b}</span></div>))}</div>))}</div>)}
  if(block.type==="brmap"){
    const paths={AC:"M75,235 L130,225 L155,255 L145,285 L95,295 L60,275 Z",AM:"M75,140 L200,120 L280,145 L300,215 L235,240 L155,255 L130,225 L75,235 Z",RR:"M180,60 L250,60 L275,105 L245,135 L205,130 L180,105 Z",AP:"M290,80 L330,80 L340,120 L315,140 L285,125 Z",PA:"M280,145 L400,130 L440,190 L420,255 L370,260 L300,215 Z",MA:"M420,180 L490,170 L510,205 L495,250 L440,265 L425,235 Z",PI:"M490,180 L545,175 L560,235 L535,275 L495,260 Z",CE:"M545,155 L600,145 L620,180 L610,205 L565,195 L545,175 Z",RN:"M615,170 L655,155 L665,180 L640,195 Z",PB:"M625,190 L665,180 L672,205 L640,215 Z",PE:"M580,205 L672,205 L680,230 L590,235 Z",AL:"M615,225 L662,225 L668,245 L620,245 Z",SE:"M600,240 L640,240 L648,258 L605,258 Z",BA:"M440,265 L560,235 L620,255 L640,315 L560,375 L490,365 L440,320 Z",TO:"M370,260 L440,265 L440,320 L400,340 L360,315 Z",RO:"M155,255 L235,240 L275,285 L245,315 L175,305 L145,285 Z",MT:"M235,240 L370,260 L360,315 L310,355 L245,340 L225,300 L275,285 Z",MS:"M285,355 L380,340 L410,380 L385,420 L295,415 L265,385 Z",GO:"M370,320 L440,320 L465,375 L420,405 L385,395 L360,360 Z",DF:"M425,345 L455,345 L455,365 L425,365 Z",MG:"M420,335 L560,335 L580,380 L540,430 L475,435 L410,405 Z",ES:"M580,375 L620,370 L625,410 L595,420 Z",RJ:"M540,420 L610,410 L620,440 L555,455 Z",SP:"M375,415 L515,410 L555,445 L490,470 L380,470 L340,440 Z",PR:"M295,455 L440,455 L465,485 L410,510 L305,505 L275,485 Z",SC:"M305,505 L430,500 L450,530 L385,545 L305,540 Z",RS:"M275,540 L410,530 L420,595 L350,625 L275,610 L240,570 Z"};
    const baseColor=c.baseColor||"#D9DDE1";
    return(<div><div className="bb-title">{c.title}</div>{c.subtitle&&<div className="bb-text" style={{marginBottom:8,fontSize:11}}>{c.subtitle}</div>}<div className="b-br-wrap"><svg viewBox="0 0 730 660" className="b-br-svg" style={{maxWidth:"100%",width:"100%",height:"auto"}}>{Object.entries(paths).map(([uf,d])=>{const s=c.states[uf];const fill=s==="strong"?c.strongColor:s==="light"?c.lightColor:baseColor;return(<path key={uf} d={d} fill={fill} stroke="#fff" strokeWidth="1.5"/>)})}{Object.entries(paths).map(([uf,d])=>{const s=c.states[uf];if(!s)return null;const nums=d.match(/\d+/g).map(Number);const xs=[],ys=[];for(let i=0;i<nums.length;i+=2){xs.push(nums[i]);ys.push(nums[i+1])}const cx=(Math.min(...xs)+Math.max(...xs))/2;const cy=(Math.min(...ys)+Math.max(...ys))/2;return(<text key={"t"+uf} x={cx} y={cy} textAnchor="middle" dominantBaseline="middle" fontSize={11} fontWeight="700" fill="#fff" style={{userSelect:"none",pointerEvents:"none"}}>{uf}</text>)})}</svg></div>{c.showLegend&&(<div className="b-br-legend"><span><span className="b-br-lg-dot" style={{background:c.strongColor}}/>{c.strongLabel}</span><span><span className="b-br-lg-dot" style={{background:c.lightColor}}/>{c.lightLabel}</span></div>)}</div>)}
  if(block.type==="tutorial")return(<div><div className="bb-title">{c.title}</div><div className="b-tut-grid" style={{gridTemplateColumns:"1fr"}}>{c.steps.map((s,i)=>{const src=s.src||s.imageId?imgMap.get(s.imageId):null;return(<div key={i} className="step-card"><div className="step-num">Passo {i+1}</div><div className="step-title">{s.title}</div><div className="step-desc" style={{textAlign:"justify"}}>{s.desc}</div><div className="step-img" style={{height:s.imgH}}>{src?<img src={src} style={{display:"block"}} alt=""/>:<div style={{display:"flex",alignItems:"center",justifyContent:"center",height:"100%",color:C.grayL,fontSize:9}}>🖼️ Imagem</div>}</div></div>)})}</div></div>);
  if(block.type==="cta")return(<div className="b-cta"><div className="b-cta-t">{c.title}</div><HTML v={c.html} fallback={c.text} cls="b-cta-txt"/></div>);
  if(block.type==="dica")return(<div><div className="bb-title">{c.title||"Dica"}</div><div className="bdica"><div className="bdica-h">💡 {c.title||"Dica Profissional"}</div><HTML v={c.html} fallback={c.text} cls="bdica-t"/></div></div>);
  if(block.type==="alert")return(<div className={`balert ${c.atype}`}><div style={{fontSize:8,fontWeight:700,color:C.dark,textTransform:"uppercase",marginBottom:2}}>{c.atype==="warning"?"⚠️ Atenção":"ℹ️ Informação"}</div><HTML v={c.html} fallback={c.text} cls="bb-text"/></div>);
  if(block.type==="assinatura")return(<div>{(c.html||c.msg)&&<div className="b-sig-msg"><HTML v={c.html} fallback={c.msg}/></div>}<div style={(c.html||c.msg)?{borderTop:"1px solid "+C.border,paddingTop:6}:{}}><div className="b-sig-name">{c.name}</div><div className="b-sig-role">{c.role}</div></div></div>);
  return null;
}
