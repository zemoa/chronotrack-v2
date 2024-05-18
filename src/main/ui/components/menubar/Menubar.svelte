<script lang="ts">
    import { ActionIcon } from "@svelteuidev/core";
    import { Cross1, EnterFullScreen, Minus } from "svelte-radix";
    function minimize() {
        window.windowApi.minimize()
    }
    function fullscreen() {
        window.windowApi.maxunmax()
    }
    function close() {
        window.close()
    }
</script>
<menu>
<ActionIcon on:click={minimize}>
    <Minus />
</ActionIcon>
<ActionIcon on:click={fullscreen}>
    <EnterFullScreen />
</ActionIcon>
<ActionIcon on:click={close}>
    <Cross1 />
</ActionIcon>
</menu>