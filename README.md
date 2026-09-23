# CHiky Party

Página web de **¡CHiky Party!** — renta de inflables, juegos y caballetes para fiestas infantiles.

## Estructura

```
chiky-party/
├── index.html
├── mantenimiento.html
├── css/
│   ├── styles.css
│   └── maintenance.css
├── js/
│   ├── site-config.js      ← interruptor de mantenimiento
│   ├── maintenance-gate.js
│   ├── maintenance-page.js
│   ├── i18n.js
│   └── main.js
└── assets/images/
```

## Modo mantenimiento

Edita solo `js/site-config.js`:

```js
maintenance: true,   // sitio oculto → muestra mantenimiento.html
maintenance: false,  // sitio normal en línea
```

1. Cambia `maintenance` a `true`.
2. Sube / despliega el cambio (GitHub → Vercel).
3. Cuando termines, vuelve a `false` y despliega de nuevo.

### Previsualizar el sitio estando en mantenimiento

Abre:

```
https://tu-dominio.com/?preview=chiky-preview
```

(Usa la clave de `maintenanceBypassKey` en `site-config.js`.) Esa sesión del navegador podrá ver el sitio; el resto de visitantes seguirán viendo mantenimiento.

## Desarrollo local

Abre `index.html` en el navegador, o usa Laragon / un servidor estático en la raíz del proyecto.

## Deploy (Vercel)

1. Sube el repo a GitHub.
2. Importa el proyecto en [Vercel](https://vercel.com).
3. Framework preset: **Other** (sitio estático).
4. Root directory: la raíz del repo (donde está `index.html`).

## Personalizar

- WhatsApp y mantenimiento: `js/site-config.js`
- Textos ES/EN del sitio: `js/i18n.js`
- Fecha de apertura: textos del hero / `i18n.js`
