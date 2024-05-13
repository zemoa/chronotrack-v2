<script lang="ts">
    import { ActionIcon } from "@svelteuidev/core";
    import { Cross1, EnterFullScreen, Minus } from "svelte-radix";
    function fullscreen() {
        window.windowApi.maximize()
    }
    function close() {
        window.close()
    }
</script>
<menu>
<ActionIcon>
    <Minus />
</ActionIcon>
<ActionIcon on:click={fullscreen}>
    <EnterFullScreen />
</ActionIcon>
<ActionIcon on:click={close}>
    <Cross1 />
</ActionIcon>
</menu>