<script>
    import { isValidInput } from "./store";
    import { checkIsEnglish } from "../sevices/ia";

    const handleChange = async (e) => {
        const { value } = e.target;

        const isValid = value.length > 0;

        if (!isValid) {
            isValidInput.set(false);
            return;
        }

        const isEnglish = await checkIsEnglish(value);
        isValidInput.set(isEnglish);
    };
</script>

<label class="text-gray-700" for="resultado">
    <textarea
        on:input={handleChange}
        class="flex-1 w-full px-4 py-2 text-base text-gray-700 placeholder-gray-400 bg-white border border-gray-300 rounded-lg appearance-none focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
        id="resultado"
        placeholder="Ingresa un texto en inglés para arreglarlo."
        name="resultado"
        rows="5"
        cols="40"
    />
</label>
