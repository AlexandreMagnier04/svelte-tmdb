<script lang="ts">
	let { children } = $props();
</script>

<div
	class="relative flex min-h-screen items-center justify-center overflow-hidden bg-zinc-950 px-4 py-12 font-sans text-zinc-100"
>
	<div
		class="pointer-events-none absolute -top-40 left-1/2 h-150 w-150 -translate-x-1/2 rounded-full bg-emerald-700/20 blur-3xl"
	></div>
	<div
		class="pointer-events-none absolute right-0 -bottom-40 h-100 w-100 rounded-full bg-emerald-900/30 blur-3xl"
	></div>

	<div class="relative z-10 w-full max-w-md">
		{@render children()}
	</div>
</div>
