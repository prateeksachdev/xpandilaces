<script>
  export default {
    functional: true,
    render: function (createElement, context) {
      var data = {
        props: {
          name: 'height'
        },
        on: {
          enter (element) {
            element.style.height = 'auto'

            const height = getComputedStyle(element).height
            element.style.height = 0

            // Force repaint to make sure the
            // animation is triggered correctly.
            getComputedStyle(element).height

            // Trigger the animation.
            // We use `setTimeout` because we need
            // to make sure the browser has finished
            // painting after setting the `height`
            // to `0` in the line above.
            setTimeout(() => {
              element.style.height = height
            })
          },

          afterEnter (element) {
            element.style.height = 'auto'
          },

          leave (element) {
            const height = getComputedStyle(element).height

            element.style.height = height

            // Force repaint to make sure the
            // animation is triggered correctly.
            getComputedStyle(element).height

            setTimeout(() => {
              element.style.height = 0
            })
          }
        }
      }
      return createElement('transition', data, context.children)
    }
  }
</script>