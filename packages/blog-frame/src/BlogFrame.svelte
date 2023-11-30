<script lang="ts">
  import './_blog_frame.scss';
  export let content: string;

  let klass = '';
  export { klass as class };
</script>

<article class={'blog-frame' + ' ' + klass}>
  {@html content}
</article>
