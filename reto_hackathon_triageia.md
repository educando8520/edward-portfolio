# 1. Nombre del reto

**TriageIA — El Copiloto de Soporte**

# 2. Concepto

Los participantes deben construir una aplicación que reciba un lote de tickets de soporte al cliente (texto libre, en español) y, usando un agente de IA conectado a **GLM 5.2 vía API** como motor de clasificación, produzca para cada ticket: categoría, prioridad, sentimiento del cliente, entidad/producto afectado y un borrador de primera respuesta — todo en un formato de salida estructurado (JSON) que pueda validarse automáticamente.

El corazón del reto no es "escribir mucho código", sino **diseñar bien la integración con el modelo** (prompting, parseo, validación, manejo de fallos) y envolverla en una aplicación robusta.

# 3. Historia / contexto

La startup ficticia **NimbusCloud** triplicó su volumen de tickets de soporte en un mes. El equipo humano está saturado: tickets triviales se responden rápido porque llegan primero en la cola, mientras tickets urgentes (bloqueos de cuenta, cobros duplicados) esperan días. NimbusCloud pide un "analista junior de soporte" basado en IA que **pre-procese cada ticket entrante**: lo clasifique, le asigne prioridad y redacte un borrador de respuesta, para que el equipo humano actúe primero sobre lo urgente.

# 4. Objetivo del participante

Construir una aplicación (CLI o API HTTP) que:

1. Cargue un conjunto de tickets desde un archivo de datos provisto (`tickets_sample.json`).
2. Para cada ticket, invoque al agente de IA conectado a GLM 5.2 para clasificarlo.
3. Produzca una salida JSON estructurada, por ticket, con: `category`, `priority`, `sentiment`, `product_or_module`, `suggested_response`, `confidence`.
4. Maneje errores (tickets vacíos/malformados, fallos de la API) sin caerse.
5. Sea ejecutable de punta a punta siguiendo únicamente las instrucciones del README.

# 5. Requisitos funcionales

### MVP obligatorio

- Cargar el dataset de tickets provisto.
- Clasificar cada ticket **usando una llamada real al modelo GLM 5.2** (no si-entonces hardcodeados) para asignar `category` (enum fijo, ver sección 8) y `priority` (`P1`–`P4`).
- Emitir un archivo o respuesta JSON válida con, al menos, `ticket_id`, `category`, `priority` por ticket.
- Manejar al menos un caso de error (ticket vacío o campo faltante) sin que la aplicación se detenga con una excepción no controlada.
- README con instrucciones de instalación y ejecución que un tercero pueda seguir sin ayuda.

### Mejoras opcionales

- Extracción de `sentiment` y `product_or_module`.
- Generación de `suggested_response` (borrador de respuesta).
- `confidence` numérico y lógica de abstención cuando la confianza es baja.
- Reintentos con backoff ante fallos/timeouts de la API del modelo.
- Caché para evitar reprocesar el mismo ticket.
- Tests automatizados (unitarios/integración) que validen esquema y manejo de errores.
- Dashboard o vista simple ordenada por prioridad.
- Métricas agregadas (tickets por categoría/prioridad).
- Configuración externalizada (categorías, prompts, umbrales) sin credenciales hardcodeadas.
- Clasificador de respaldo (regla simple) si la API del modelo no está disponible.
- Dockerfile / script de CI.

# 6. Restricciones técnicas

**Obligatorio:**
- El paso de clasificación central debe invocar realmente al agente/API de GLM 5.2 (verificable en el código, no solo mencionado en el README).
- La salida debe ser JSON válido conforme a un esquema documentado en el propio repositorio.

**Recomendado (libre elección):**
- Lenguaje y framework a elección del participante (Python, Node, Go, etc.).
- Si se expone como API HTTP, cualquier framework liviano (FastAPI, Flask, Express...); si es CLI, un simple script es suficiente.

**Libre:**
- Base de datos (no es necesaria; archivo/JSON en memoria es válido).
- Frontend/dashboard (opcional).
- Método de despliegue (no se evalúa despliegue, solo ejecución local).

No se exige ninguna tecnología innecesaria: **no hace falta base de datos, frontend, autenticación ni infraestructura de contenedores** para el MVP.

# 7. Flujo esperado de la aplicación

1. El participante carga `tickets_sample.json` (provisto) en su aplicación.
2. La aplicación construye un prompt por ticket (o por lote) y llama al agente configurado con GLM 5.2.
3. La aplicación parsea y valida la respuesta del modelo contra el esquema esperado; si la respuesta es inválida, reintenta o registra el error de forma controlada.
4. La aplicación consolida los resultados y los expone (archivo `resultados.json` o respuesta HTTP).
5. El jurado (o el propio participante) ejecuta la app siguiendo el README, corre los tests si existen, e inspecciona la salida.

# 8. Ejemplo de uso

**Categorías válidas:** `Facturación`, `Bug técnico`, `Cuenta y acceso`, `Solicitud de función`, `Otro`
**Prioridades válidas:** `P1` (bloqueante/urgente), `P2` (alta), `P3` (normal), `P4` (baja)

Dataset de muestra entregado a los participantes (`tickets_sample.json`):

| ticket_id | texto | resultado esperado (orientativo) |
|---|---|---|
| T1 | "Llevo 3 días sin poder acceder a mi cuenta, me sale error 500 cada vez que intento iniciar sesión. Necesito entrar antes del viernes para presentar un reporte." | `Cuenta y acceso`, `P1`, sentimiento negativo |
| T2 | "¿Podrían agregar modo oscuro a la aplicación? Sería un gran plus." | `Solicitud de función`, `P4`, sentimiento positivo |
| T3 | "Se me cobró dos veces la suscripción de este mes, por favor reembolsen el cargo duplicado." | `Facturación`, `P2`, sentimiento negativo |
| T4 | "El botón de exportar a PDF no responde cuando hago clic, uso Chrome en Windows 11." | `Bug técnico`, `P2`, sentimiento neutral |
| T5 | "Solo quería agradecerles, el nuevo panel de reportes quedó excelente." | `Otro`, `P4`, sentimiento positivo |

Salida esperada por ticket (esquema JSON):

```json
{
  "ticket_id": "T1",
  "category": "Cuenta y acceso",
  "priority": "P1",
  "sentiment": "negativo",
  "product_or_module": "login",
  "suggested_response": "Lamentamos el inconveniente con el acceso a tu cuenta...",
  "confidence": 0.87
}
```

# 9. Arquitectura sugerida

```
[tickets_sample.json]
        │
        ▼
[Cargador de datos]
        │
        ▼
[Constructor de prompt] ──► [Cliente GLM 5.2 API] ──(reintentos/backoff)──► [GLM 5.2]
        │                            │
        │◄───────────────────────────┘
        ▼
[Validador de esquema / parser JSON]
        │
        ▼
[Escritor de resultados] → resultados.json (o respuesta HTTP)
        │
        ▼
   (opcional) Dashboard simple
```

Es solo una sugerencia; cualquier arquitectura que cumpla el flujo (carga → prompt → llamada al modelo → validación → salida) es válida, incluyendo un único script si está bien organizado en funciones.

# 10. Estrategia para 80 minutos

- **0–10 min:** Leer el reto, revisar el dataset y el esquema de salida, configurar el acceso al agente/API.
- **10–40 min:** Implementar el MVP (carga de tickets → prompt → llamada al modelo → salida JSON básica).
- **40–55 min:** Manejo de errores, validación de esquema, prueba manual con el dataset de muestra.
- **55–70 min:** Mejoras opcionales (extracción de entidades, tests, reintentos, dashboard).
- **70–80 min:** Pulir README, probar ejecución end-to-end desde cero, commit y push a la rama propia.

# 11. Cómo incentiva el uso del agente de IA

El reto está diseñado para que delegar en el agente (Claude Code/OpenCode/Copilot conectado a GLM 5.2) **no sea opcional sino la vía natural** de resolverlo:

- **Diseño y ajuste iterativo del prompt** para que el modelo devuelva JSON confiable y consistente — esto es prompt engineering real, con iteración observable.
- **Construcción del cliente de API** con manejo de timeouts, reintentos y parseo de respuestas — tarea mecánica ideal para delegar y depurar con el agente.
- **Depuración de parsing** cuando el modelo devuelve texto adicional fuera del JSON esperado.
- **Generación de tests y de tickets de prueba adicionales** (casos límite, ambiguos) apoyándose en el agente.
- **Refactorización arquitectónica** sugerida y aplicada por el agente a medida que crece el código.
- **Redacción del README** y de la documentación mínima con ayuda del agente, dejando más tiempo al participante para la lógica central.

# 12. Diseño de la evaluación automática

**Archivos a inspeccionar:** `README.md`, manifiesto de dependencias (`requirements.txt`/`package.json`/etc.), código fuente (`src/` o raíz), carpeta de tests, cualquier `prompts/` o documentación de prompts, `.env.example` (o equivalente, para confirmar que no hay credenciales hardcodeadas), historial de commits de la rama.

**Comandos a ejecutar:** clonar/hacer *checkout* de la rama del participante; instalar dependencias según el README; ejecutar la aplicación contra el dataset de referencia (el de muestra + el oculto, ver sección 14); ejecutar la suite de tests si existe (`pytest`, `npm test`, etc.).

**Cómo levantar la aplicación:** exactamente como lo indique el README del participante — si las instrucciones no son suficientes para levantarla sin intervención manual adicional, eso en sí mismo es evidencia negativa para el criterio A1.

**Pruebas a realizar:** correr el dataset de muestra y el oculto; verificar que cada salida cumple el esquema JSON; verificar que un ticket malformado no rompe la ejecución; revisar el código en busca de una llamada real a la API de GLM 5.2 (no una simulación local).

**Evidencias a buscar:** presencia de llamadas HTTP/SDK al modelo; manejo de excepciones alrededor de esas llamadas; tests que verifiquen valores reales (no *asserts* triviales); artefactos que documenten el uso del agente (prompts guardados, notas de iteración, mensajes de commit descriptivos).

**Qué NO debe evaluarse subjetivamente:** la creatividad o el "tono" del `suggested_response`; la estética del dashboard si existe; la elección de framework o lenguaje; el estilo de nombres de variables más allá de una consistencia mínima; cualquier decisión de arquitectura alternativa que cumpla el flujo funcional.

# 13. Rúbrica de evaluación

Escala: cada criterio tiene un **peso** (puntos máximos). Los niveles 0/1/2/3 representan 0%, ~33%, ~67% y 100% de ese peso respectivamente. La suma de todos los pesos es exactamente **100 puntos**.

| Criterio | Peso | Evidencia verificable | 0 puntos | 1 punto | 2 puntos | 3 puntos |
|---|---|---|---|---|---|---|
| **A1. Ejecución end-to-end** | 9 | La app corre siguiendo solo el README, sin pasos no documentados | No corre / requiere pasos no documentados | Corre con intervención manual extra del evaluador (3 pts) | Corre con advertencias menores (6 pts) | Corre limpiamente siguiendo el README (9 pts) |
| **A2. Clasificación funcional** | 12 | Salida sobre dataset de muestra + oculto comparada con resultado esperado (tolerancia: categoría y prioridad correctas en ≥N/8 tickets) | Clasificación ausente o aleatoria | Acierta en tickets triviales solamente (4 pts) | Acierta en la mayoría del set visible pero falla en el oculto (8 pts) | Acierta consistentemente en visibles y ocultos (12 pts) |
| **A3. Formato de salida válido** | 9 | Validación del JSON contra el esquema documentado | JSON inválido o campos faltantes | Válido pero con campos opcionales faltantes (3 pts) | Válido, campos obligatorios completos (6 pts) | Válido y con campos opcionales bien poblados (9 pts) |
| **B1. Arquitectura y separación de responsabilidades** | 8 | Lectura de código: ¿carga, prompt, cliente API, validación y salida están separados? | Todo en un bloque monolítico sin separación | Alguna separación mínima (3 pts) | Separación clara de las etapas principales (5 pts) | Separación clara + capas fácilmente testeables/extensibles (8 pts) |
| **B2. Configuración externa** | 6 | Búsqueda de credenciales hardcodeadas; presencia de `.env`/config | Credenciales o valores clave hardcodeados en el código | Configuración parcial (2 pts) | Configuración externa correcta sin secretos expuestos (4 pts) | Configuración externa + valores documentados en README (6 pts) |
| **B3. Calidad y legibilidad del código** | 6 | Lectura general del código fuente | Código difícil de seguir, sin estructura mínima | Legible pero con duplicación notable (2 pts) | Legible y razonablemente organizado (4 pts) | Legible, organizado y con nombres claros (6 pts) |
| **C1. Manejo de errores de API** | 8 | Inspección de código alrededor de la llamada al modelo; prueba forzando timeout/respuesta inválida si es posible | Sin manejo, la app se cae ante un fallo de API | Captura genérica sin recuperación (3 pts) | Manejo específico sin reintentos (5 pts) | Manejo específico + reintentos/backoff (8 pts) |
| **C2. Manejo de entradas inválidas** | 7 | Ejecutar con ticket vacío/malformado del set oculto | La app se cae o produce salida corrupta | Falla mostrando error legible, sin seguir procesando el resto (2 pts) | Ignora el ticket inválido y continúa (5 pts) | Marca el ticket como no procesable de forma explícita en la salida y continúa (7 pts) |
| **C3. Generalización a tickets ocultos** | 5 | Comparar desempeño en set visible vs. oculto | Falla sistemáticamente en tickets no vistos | Degradación notable en ocultos (2 pts) | Desempeño similar con alguna degradación (3 pts) | Desempeño equivalente entre visibles y ocultos (5 pts) |
| **D1. Tests automatizados existen y pasan** | 9 | Ejecutar la suite de tests | No hay tests o no corren | Tests presentes pero fallan o son triviales (3 pts) | Tests relevantes pasan (6 pts) | Tests relevantes pasan y cubren éxito + error (9 pts) |
| **D2. Cobertura de casos relevantes** | 6 | Lectura del contenido de los tests | Sin casos relevantes | Solo caso feliz (2 pts) | Caso feliz + validación de esquema (4 pts) | Caso feliz + esquema + al menos un caso de error/edge (6 pts) |
| **E1. Uso significativo del agente de IA** | 15 | Historial de commits, carpeta de prompts, notas de iteración, sección del README sobre uso del agente | Sin evidencia de uso del agente más allá de un README genérico | Mención genérica sin artefactos concretos (5 pts) | Evidencia parcial (prompts guardados o commits descriptivos, no ambos) (10 pts) | Evidencia clara y concreta: prompts documentados + commits/iteración visible + notas específicas de qué se delegó (15 pts) |

# 14. Protocolo de evaluación mediante Claude Code

Datos de referencia que debe tener el jurado antes de evaluar:
- `tickets_sample.json`: los 5 tickets entregados a los participantes (sección 8).
- `tickets_hidden.json`: 3 tickets adicionales **no vistos por los participantes**, incluyendo al menos uno malformado (campo de texto vacío), usados para probar generalización y robustez (criterios C2 y C3).

Procedimiento:

1. Listar las ramas del repositorio y, para cada una, hacer *checkout*.
2. Leer el `README.md` de la rama y localizar instrucciones de instalación/ejecución.
3. Instalar dependencias según el README (con un límite de tiempo razonable; si falla, registrarlo como evidencia negativa de A1, no reintentar indefinidamente).
4. Ejecutar la aplicación contra `tickets_sample.json` y luego contra `tickets_hidden.json`.
5. Validar cada salida contra el esquema JSON documentado.
6. Ejecutar la suite de tests del participante, si existe.
7. Leer el código fuente para verificar: llamada real a GLM 5.2, manejo de errores/reintentos, separación de responsabilidades, configuración externa.
8. Buscar evidencia de uso del agente de IA (commits, carpeta de prompts, notas en README).
9. Aplicar la rúbrica de la sección 13 y calcular el puntaje total.
10. Producir una salida estructurada por participante con el siguiente formato:

```json
{
  "participante": "nombre o rama",
  "puntuacion_por_criterio": {
    "A1": 0, "A2": 0, "A3": 0,
    "B1": 0, "B2": 0, "B3": 0,
    "C1": 0, "C2": 0, "C3": 0,
    "D1": 0, "D2": 0,
    "E1": 0
  },
  "puntuacion_total": 0,
  "funcionalidades_verificadas": [],
  "problemas_encontrados": [],
  "evidencia": [],
  "comandos_ejecutados": [],
  "recomendaciones": [],
  "nivel_de_confianza": "alto | medio | bajo"
}
```

Este formato permite comparar directamente a los 10 participantes en una tabla y minimiza la intervención manual del jurado a una revisión final de los casos límite que el agente marque con confianza "bajo" o "medio".

# 15. Prompt para el evaluador

```
Actúa como evaluador técnico experto de un reto de hackathon. Tu tarea es evaluar
objetivamente la solución de UN participante, aplicando exactamente la rúbrica
que se te entrega a continuación. No asumas que una funcionalidad existe solo
porque está mencionada en el README: verifícala ejecutando el código.

DATOS DE ENTRADA (a completar por el jurado):
- Repositorio: {REPO_URL}
- Rama del participante: {BRANCH_NAME}
- Dataset de muestra: tickets_sample.json (adjunto/en el repo)
- Dataset oculto: tickets_hidden.json (adjunto, NO visto por el participante)

REGLAS DE EVALUACIÓN:
1. Haz checkout de la rama indicada e inspecciona la estructura del repositorio.
2. Lee el README y sigue EXACTAMENTE sus instrucciones para instalar y ejecutar
   la aplicación. Si las instrucciones no bastan para ejecutarla sin pasos
   adicionales no documentados, regístralo como evidencia negativa.
3. Ejecuta la aplicación contra tickets_sample.json y luego contra
   tickets_hidden.json. Registra la salida real obtenida.
4. Valida cada salida contra el esquema JSON esperado (campos: ticket_id,
   category, priority, sentiment, product_or_module, suggested_response,
   confidence).
5. Ejecuta la suite de tests del participante si existe, y registra si pasan
   o fallan.
6. Inspecciona el código fuente para verificar: (a) que existe una llamada
   real a la API/agente de GLM 5.2 para la clasificación (no lógica
   hardcodeada), (b) manejo de errores/timeouts/reintentos alrededor de esa
   llamada, (c) separación de responsabilidades, (d) ausencia de credenciales
   hardcodeadas.
7. Busca evidencia de uso significativo del agente de IA: historial de
   commits, carpeta de prompts, notas de iteración, sección del README sobre
   cómo se usó el agente.
8. Aplica ESTRICTAMENTE la siguiente rúbrica (100 puntos totales). No otorgues
   puntos por funcionalidades que no hayas podido observar ejecutándose o
   leyendo el código directamente.

RÚBRICA:
[Pega aquí la tabla completa de la sección 13 de este documento: A1 (9),
A2 (12), A3 (9), B1 (8), B2 (6), B3 (6), C1 (8), C2 (7), C3 (5), D1 (9),
D2 (6), E1 (15). Total = 100 puntos.]

RESTRICCIONES IMPORTANTES:
- No inventes resultados. Si no pudiste ejecutar algo, dilo explícitamente
  y asigna 0 o el nivel de confianza más bajo para ese criterio, explicando
  por qué.
- Distingue siempre entre EVIDENCIA OBSERVADA (lo que viste correr o leíste
  en el código) e INFERENCIA (lo que supones razonablemente pero no
  verificaste). Marca claramente cada afirmación como una u otra.
- No evalúes subjetivamente la creatividad del texto de las respuestas
  sugeridas, la estética del código o del dashboard, ni la elección de
  lenguaje/framework — solo si el flujo funcional se cumple.
- No asumas que documentación implica implementación.

SALIDA ESPERADA (formato JSON):
{
  "participante": "...",
  "puntuacion_por_criterio": { "A1": 0, "A2": 0, "A3": 0, "B1": 0, "B2": 0,
    "B3": 0, "C1": 0, "C2": 0, "C3": 0, "D1": 0, "D2": 0, "E1": 0 },
  "puntuacion_total": 0,
  "funcionalidades_verificadas": ["..."],
  "problemas_encontrados": ["..."],
  "evidencia": ["..."],
  "comandos_ejecutados": ["..."],
  "recomendaciones": ["..."],
  "nivel_de_confianza": "alto | medio | bajo"
}

Produce únicamente esta salida estructurada al finalizar tu evaluación.
```

# 16. Prueba de estrés del reto

1. **Hardcodear respuestas para los tickets de muestra en vez de llamar al modelo.**
   Mitigación: se evalúa también con `tickets_hidden.json`, nunca visto por el participante (criterio C3); el evaluador además inspecciona el código buscando la llamada real a la API de GLM 5.2.

2. **Simular una llamada a la IA con una salida estática para "aparentar" integración real.**
   Mitigación: exigir en el MVP que la app registre/loguee el prompt y la respuesta cruda del modelo por ticket (auditable); el evaluador puede comparar si variar el texto de un ticket oculto cambia la salida — si no cambia, es señal de simulación.

3. **README que documenta funcionalidades que en realidad no están implementadas.**
   Mitigación: la rúbrica indica explícitamente que ningún punto funcional se otorga solo por documentación; el evaluador debe ejecutar el código, no solo leer el README (ya reflejado en la sección 12).

4. **Tests triviales que siempre pasan (asserts vacíos o sin verificación real).**
   Mitigación: el criterio D2 exige inspeccionar el *contenido* de los tests, no solo si pasan; se penaliza explícitamente un test que no verifique valores concretos.

5. **Simular "uso intensivo de IA" con un único commit masivo al final, sin iteración real.**
   Mitigación: el criterio E1 requiere evidencia concreta (prompts guardados, notas específicas de qué se delegó), no solo la cantidad o el volumen de commits; un commit único y masivo sin artefactos de iteración obtiene la puntuación más baja de ese criterio.

6. **Ambigüedad en el formato exacto de campos (ej. usar números en vez de "P1"–"P4").**
   Mitigación: el enunciado fija explícitamente el enum de categorías y prioridades (sección 8) y el esquema JSON exacto, eliminando la ambigüedad antes de que empiece el reto.

7. **Clasificar con reglas fijas o un modelo local, llamando a eso "uso de IA".**
   Mitigación: se exige explícitamente en el MVP (sección 5) que el paso de clasificación central invoque al agente conectado a GLM 5.2; el evaluador verifica esto leyendo el código, no la afirmación del participante.
