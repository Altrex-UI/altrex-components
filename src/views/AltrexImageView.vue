<template>
    <div class="image-demo">
        <h1>Altrex Image Component Demo</h1>
        <p class="page-description">
            Optimized image component with lazy loading, responsive images, loading states, and error handling.
        </p>

        <!-- Mobile-First Responsive Demo -->
        <section class="demo-section">
            <h2>Mobile-First Optimization</h2>
            <p class="description">
                Images automatically optimize for different viewports with lazy loading and responsive srcsets.
            </p>

            <div class="demo-group">
                <div class="demo-item">
                    <AltrexImage
                        src="https://picsum.photos/800/600"
                        alt="Responsive landscape image"
                        aspect-ratio="4/3"
                        caption="Responsive image with 4:3 aspect ratio"
                    />
                </div>
            </div>
        </section>

        <!-- Object Fit Variants -->
        <section class="demo-section">
            <h2>Object Fit Variants</h2>
            <p class="description">
                Control how images fill their containers using object-fit property.
            </p>

            <div class="demo-grid">
                <div class="demo-item">
                    <AltrexImage
                        src="https://picsum.photos/600/400"
                        alt="Cover example"
                        aspect-ratio="1/1"
                        object-fit="cover"
                        caption="Cover (default) - fills container, crops if needed"
                    />
                </div>

                <div class="demo-item">
                    <AltrexImage
                        src="https://picsum.photos/600/400"
                        alt="Contain example"
                        aspect-ratio="1/1"
                        object-fit="contain"
                        caption="Contain - shows entire image, may have letterboxing"
                    />
                </div>

                <div class="demo-item">
                    <AltrexImage
                        src="https://picsum.photos/600/400"
                        alt="Fill example"
                        aspect-ratio="1/1"
                        object-fit="fill"
                        caption="Fill - stretches to fill container"
                    />
                </div>

                <div class="demo-item">
                    <AltrexImage
                        src="https://picsum.photos/600/400"
                        alt="Scale-down example"
                        aspect-ratio="1/1"
                        object-fit="scale-down"
                        caption="Scale-down - smaller of none or contain"
                    />
                </div>
            </div>
        </section>

        <!-- Aspect Ratios -->
        <section class="demo-section">
            <h2>Aspect Ratios</h2>
            <p class="description">
                Maintain consistent aspect ratios across different image sizes.
            </p>

            <div class="demo-grid">
                <div class="demo-item">
                    <AltrexImage
                        src="https://picsum.photos/1920/1080"
                        alt="16:9 aspect ratio"
                        aspect-ratio="16/9"
                        caption="16:9 - Widescreen"
                    />
                </div>

                <div class="demo-item">
                    <AltrexImage
                        src="https://picsum.photos/800/600"
                        alt="4:3 aspect ratio"
                        aspect-ratio="4/3"
                        caption="4:3 - Standard"
                    />
                </div>

                <div class="demo-item">
                    <AltrexImage
                        src="https://picsum.photos/800/800"
                        alt="1:1 aspect ratio"
                        aspect-ratio="1/1"
                        caption="1:1 - Square"
                    />
                </div>

                <div class="demo-item">
                    <AltrexImage
                        src="https://picsum.photos/600/800"
                        alt="3:4 aspect ratio"
                        aspect-ratio="3/4"
                        caption="3:4 - Portrait"
                    />
                </div>
            </div>
        </section>

        <!-- Border Radius -->
        <section class="demo-section">
            <h2>Border Radius Variants</h2>
            <p class="description">
                Apply different border radius values for varied visual styles.
            </p>

            <div class="demo-grid">
                <div class="demo-item">
                    <AltrexImage
                        src="https://picsum.photos/400/400"
                        alt="No border radius"
                        aspect-ratio="1/1"
                        rounded="none"
                        caption="None"
                    />
                </div>

                <div class="demo-item">
                    <AltrexImage
                        src="https://picsum.photos/400/400"
                        alt="Small border radius"
                        aspect-ratio="1/1"
                        rounded="sm"
                        caption="Small"
                    />
                </div>

                <div class="demo-item">
                    <AltrexImage
                        src="https://picsum.photos/400/400"
                        alt="Default border radius"
                        aspect-ratio="1/1"
                        rounded="default"
                        caption="Default"
                    />
                </div>

                <div class="demo-item">
                    <AltrexImage
                        src="https://picsum.photos/400/400"
                        alt="Large border radius"
                        aspect-ratio="1/1"
                        rounded="lg"
                        caption="Large"
                    />
                </div>

                <div class="demo-item">
                    <AltrexImage
                        src="https://picsum.photos/400/400"
                        alt="Extra large border radius"
                        aspect-ratio="1/1"
                        rounded="xl"
                        caption="Extra Large"
                    />
                </div>

                <div class="demo-item">
                    <AltrexImage
                        src="https://picsum.photos/400/400"
                        alt="Full border radius (circle)"
                        aspect-ratio="1/1"
                        rounded="full"
                        caption="Full (circle)"
                    />
                </div>
            </div>
        </section>

        <!-- Loading States -->
        <section class="demo-section">
            <h2>Loading & Error States</h2>
            <p class="description">
                Built-in loading placeholders and error handling.
            </p>

            <div class="demo-grid">
                <div class="demo-item">
                    <AltrexImage
                        :src="`https://picsum.photos/400/400?random=${Date.now()}`"
                        alt="Loading example"
                        aspect-ratio="1/1"
                        caption="Image with loading state"
                    />
                </div>

                <div class="demo-item">
                    <AltrexImage
                        src="https://invalid-url-that-will-fail.example/image.jpg"
                        alt="Error state example"
                        aspect-ratio="1/1"
                        caption="Image with error state"
                        error-message="Image could not be loaded"
                    />
                </div>

                <div class="demo-item">
                    <AltrexImage
                        src="https://invalid-url.example/image.jpg"
                        alt="Custom error slot"
                        aspect-ratio="1/1"
                        caption="Custom error content"
                    >
                        <template #error>
                            <div style="display: flex; flex-direction: column; align-items: center; gap: 8px; padding: 16px;">
                                <AltrexIcon icon="generic-alert-triangle" size="l" style="color: var(--altrex-colors-warning-500);" />
                                <span style="font-size: 14px; color: var(--altrex-colors-neutral-600);">
                                    Custom error content
                                </span>
                            </div>
                        </template>
                    </AltrexImage>
                </div>

                <div class="demo-item">
                    <AltrexImage
                        :src="`https://picsum.photos/400/400?random=${Date.now() + 1}`"
                        alt="Custom placeholder"
                        aspect-ratio="1/1"
                        caption="Custom placeholder"
                    >
                        <template #placeholder>
                            <div style="display: flex; flex-direction: column; align-items: center; justify-content: center; height: 100%; gap: 8px;">
                                <AltrexIcon icon="generic-loader" size="l" style="color: var(--altrex-colors-primary-500); animation: spin 1s linear infinite;" />
                                <span style="font-size: 14px; color: var(--altrex-colors-neutral-600);">
                                    Loading...
                                </span>
                            </div>
                        </template>
                    </AltrexImage>
                </div>
            </div>
        </section>

        <!-- Loading Strategy -->
        <section class="demo-section">
            <h2>Loading Strategy</h2>
            <p class="description">
                Control when images load using the loading attribute.
            </p>

            <div class="demo-group">
                <div class="demo-item">
                    <AltrexImage
                        src="https://picsum.photos/800/600?random=1"
                        alt="Lazy loading image"
                        aspect-ratio="4/3"
                        loading="lazy"
                        caption="Lazy (default) - loads when near viewport"
                    />
                    <span class="demo-label">Lazy loading (default)</span>
                </div>

                <div class="demo-item">
                    <AltrexImage
                        src="https://picsum.photos/800/600?random=2"
                        alt="Eager loading image"
                        aspect-ratio="4/3"
                        loading="eager"
                        caption="Eager - loads immediately"
                    />
                    <span class="demo-label">Eager loading</span>
                </div>
            </div>
        </section>

        <!-- Object Position -->
        <section class="demo-section">
            <h2>Object Position</h2>
            <p class="description">
                Control the focal point of cropped images.
            </p>

            <div class="demo-grid">
                <div class="demo-item">
                    <AltrexImage
                        src="https://picsum.photos/800/600?random=10"
                        alt="Top positioned image"
                        aspect-ratio="1/1"
                        object-position="top"
                        caption="Top"
                    />
                </div>

                <div class="demo-item">
                    <AltrexImage
                        src="https://picsum.photos/800/600?random=11"
                        alt="Center positioned image"
                        aspect-ratio="1/1"
                        object-position="center"
                        caption="Center (default)"
                    />
                </div>

                <div class="demo-item">
                    <AltrexImage
                        src="https://picsum.photos/800/600?random=12"
                        alt="Bottom positioned image"
                        aspect-ratio="1/1"
                        object-position="bottom"
                        caption="Bottom"
                    />
                </div>

                <div class="demo-item">
                    <AltrexImage
                        src="https://picsum.photos/800/600?random=13"
                        alt="Left positioned image"
                        aspect-ratio="1/1"
                        object-position="left"
                        caption="Left"
                    />
                </div>
            </div>
        </section>

        <!-- Caption Slot -->
        <section class="demo-section">
            <h2>Captions</h2>
            <p class="description">
                Add captions using the caption prop or slot for custom content.
            </p>

            <div class="demo-grid">
                <div class="demo-item">
                    <AltrexImage
                        src="https://picsum.photos/600/400?random=20"
                        alt="Image with text caption"
                        aspect-ratio="3/2"
                        caption="Simple text caption via prop"
                    />
                </div>

                <div class="demo-item">
                    <AltrexImage
                        src="https://picsum.photos/600/400?random=21"
                        alt="Image with custom caption"
                        aspect-ratio="3/2"
                    >
                        <template #caption>
                            <div style="display: flex; align-items: center; gap: 8px; justify-content: center;">
                                <AltrexIcon icon="generic-camera" size="s" />
                                <span>Custom caption with icon</span>
                            </div>
                        </template>
                    </AltrexImage>
                </div>
            </div>
        </section>

        <!-- Real-world Examples -->
        <section class="demo-section">
            <h2>Real-world Examples</h2>
            <p class="description">
                Common use cases for the Image component.
            </p>

            <div class="demo-subsection">
                <h3>Profile Avatar</h3>
                <div class="demo-group">
                    <AltrexImage
                        src="https://picsum.photos/200/200?random=30"
                        alt="User profile avatar"
                        aspect-ratio="1/1"
                        rounded="full"
                        object-fit="cover"
                        style="max-width: 120px;"
                    />
                </div>
            </div>

            <div class="demo-subsection">
                <h3>Product Card</h3>
                <div class="demo-group" style="max-width: 300px;">
                    <AltrexCard size="m">
                        <template #thumbnail>
                            <AltrexImage
                                src="https://picsum.photos/400/400?random=31"
                                alt="Product image"
                                aspect-ratio="1/1"
                                rounded="none"
                                object-fit="cover"
                            />
                        </template>
                        <template #content>
                            <h4 style="margin: 0 0 8px 0;">Product Name</h4>
                            <p style="margin: 0; color: var(--altrex-colors-neutral-600);">
                                Product description with optimized image loading.
                            </p>
                        </template>
                    </AltrexCard>
                </div>
            </div>

            <div class="demo-subsection">
                <h3>Hero Banner</h3>
                <div class="demo-group">
                    <AltrexImage
                        src="https://picsum.photos/1200/400?random=32"
                        alt="Hero banner"
                        aspect-ratio="16/6"
                        rounded="lg"
                        object-fit="cover"
                        loading="eager"
                    />
                </div>
            </div>

            <div class="demo-subsection">
                <h3>Gallery Grid</h3>
                <div class="demo-grid" style="grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));">
                    <AltrexImage
                        v-for="i in 6"
                        :key="i"
                        :src="`https://picsum.photos/400/400?random=${40 + i}`"
                        :alt="`Gallery image ${i}`"
                        aspect-ratio="1/1"
                        rounded="default"
                        object-fit="cover"
                    />
                </div>
            </div>
        </section>

        <!-- Accessibility -->
        <section class="demo-section">
            <h2>Accessibility</h2>
            <p class="description">
                All images require alt text for screen readers. The component ensures proper semantic HTML.
            </p>

            <div class="demo-group">
                <div class="demo-item">
                    <AltrexImage
                        src="https://picsum.photos/600/400?random=50"
                        alt="A descriptive alt text explaining what the image shows"
                        aspect-ratio="3/2"
                        caption="Always provide meaningful alt text"
                    />
                    <pre class="code-example">
alt="A descriptive alt text explaining what the image shows"</pre>
                </div>
            </div>
        </section>
    </div>
</template>

<script>
import AltrexImage from '@/components/Image/AltrexImage.vue';
import AltrexCard from '@/components/Card/AltrexCard.vue';
import AltrexIcon from '@/components/Icon/AltrexIcon.vue';

export default {
    name: 'AltrexImageView',
    components: {
        AltrexImage,
        AltrexCard,
        AltrexIcon,
    },
};
</script>

<style lang="stylus" scoped>
.image-demo
    container-width($altrex-breakpoints-xl)
    padding-top: $altrex-spacing-6
    padding-bottom: $altrex-spacing-8

    h1
        font-size: $altrex-fluidTypography-h1
        color: $altrex-colors-neutral-900
        margin: 0 0 $altrex-spacing-4

        [data-theme="dark"] &
            color: var(--altrex-colors-dark-text-primary)

    .page-description
        font-size: $altrex-fontSize-lg
        color: $altrex-colors-neutral-700
        margin: 0 0 $altrex-spacing-8
        max-width: 800px

        [data-theme="dark"] &
            color: var(--altrex-colors-dark-text-secondary)

.demo-section
    margin-bottom: $altrex-spacing-10

    h2
        font-size: $altrex-fluidTypography-h2
        color: $altrex-colors-neutral-900
        margin: 0 0 $altrex-spacing-3

        [data-theme="dark"] &
            color: var(--altrex-colors-dark-text-primary)

    .description
        font-size: $altrex-fontSize-base
        color: $altrex-colors-neutral-600
        margin: 0 0 $altrex-spacing-6

        [data-theme="dark"] &
            color: var(--altrex-colors-dark-text-secondary)

.demo-subsection
    margin-bottom: $altrex-spacing-8

    h3
        font-size: $altrex-fluidTypography-h3
        color: $altrex-colors-neutral-900
        margin: 0 0 $altrex-spacing-4

        [data-theme="dark"] &
            color: var(--altrex-colors-dark-text-primary)

.demo-group
    display: flex
    flex-direction: column
    gap: $altrex-spacing-6

    +above('md')
        flex-direction: row
        flex-wrap: wrap

.demo-grid
    display: grid
    gap: $altrex-spacing-6
    grid-template-columns: 1fr

    +above('sm')
        grid-template-columns: repeat(2, 1fr)

    +above('md')
        grid-template-columns: repeat(3, 1fr)

.demo-item
    display: flex
    flex-direction: column
    gap: $altrex-spacing-2

.demo-label
    font-size: $altrex-fontSize-sm
    color: $altrex-colors-neutral-600

    [data-theme="dark"] &
        color: var(--altrex-colors-dark-text-secondary)

.code-example
    background: $altrex-colors-neutral-100
    padding: $altrex-spacing-3
    border-radius: $altrex-borderRadius-default
    font-size: $altrex-fontSize-sm
    overflow-x: auto
    margin-top: $altrex-spacing-2

    [data-theme="dark"] &
        background: var(--altrex-colors-dark-bg-elevated)
        color: var(--altrex-colors-dark-text-primary)

// Animation for loading spinner
@keyframes spin
    from
        transform: rotate(0deg)
    to
        transform: rotate(360deg)
</style>
