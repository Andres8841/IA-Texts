<script>
    import { fixMyEnglish } from "../sevices/ia";
    import Cargando from "./Icons/Cargando.svelte";
    import Subir from "./Icons/Subir.svelte";
    import { isValidInput } from "./store";

    let promise = null;

    const handleClick = async () => {
        const texto = document.getElementById("resultado").value;
        promise = fixMyEnglish(texto);
        const valor = await promise;
        document.getElementById("resultado").value = valor;
        promise = null;
    };
</script>

{#if promise === null}
    <button
        on:click={handleClick}
        disabled={!$isValidInput}
        type="button"
        class={`py-2 px-4 flex justify-center items-center bg-red-600 hover:bg-red-700 focus:ring-red-500 focus:ring-offset-red-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 rounded-lg
        ${!$isValidInput ? "pointer-events-none opacity-30" : ""}`}
    >
        <Subir />
        ¡Arregla mi inglés!
    </button>
{:else}
    {#await promise}
        <button
            type="button"
            class="pointer-events-none py-2 px-4 flex justify-center items-center bg-blue-600 hover:bg-blue-700 focus:ring-blue-500 focus:ring-offset-blue-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 rounded-lg"
        >
            <Cargando />
            Arreglando...
        </button>
    {/await}
{/if}

{#if !$isValidInput}
    <span class="w-full bg-red-100 p-2">
        <strong class="text-red-800"
            >¡No estás usando inglés o el texto es muy corto!</strong
        >
    </span>
{/if}
