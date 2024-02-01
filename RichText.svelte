<script>
    import { generateParagraphsFromContext } from "../sevices/ia";
    import Cargando from "./Icons/Cargando.svelte";

    let promise = null;

    let content = "";

    const generateBtn = async () => {
        promise = generateParagraphsFromContext(content);
        const valor = await promise;
        const textAreaElement = document.getElementById("textContent");
        textAreaElement.value = content +' '+ valor;
        promise = null;
    };
    
</script>

<div
    class="flex items-center justify-start bg-slate-50 rounded-md drop-shadow-2xl p-2"
>
    <h2 class="text-center w-full font-bold">
        Escribe tu texto aquí para generar párrafos
    </h2>
</div>

<textarea
    bind:value={content}
    class="bg-white rounded-md drop-shadow-2xl px-10 py-10 overflow-y-scroll max-h-72 text-sm overflow-hidden focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
    id="textContent"
/>

{#if promise === null}
    <button
        class="py-2 px-4 flex justify-center items-center bg-red-600 hover:bg-red-700 focus:ring-red-500 focus:ring-offset-red-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 rounded-lg"
        on:click={generateBtn}
    >
        Generar párrafo
    </button>
{:else}
    {#await promise}
        <button
            type="button"
            class="opacity-30 pointer-events-none py-2 px-4 flex justify-center items-center bg-blue-600 hover:bg-blue-700 focus:ring-blue-500 focus:ring-offset-blue-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 rounded-lg"
        >
            <Cargando />
            Generando párrafo...
        </button>
    {/await}
{/if}
