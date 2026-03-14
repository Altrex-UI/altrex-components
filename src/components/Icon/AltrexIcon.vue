<template>
    <svg
        :class="className"
        aria-hidden="true"
        focusable="false"
    >
        <use :xlink:href="href" />
    </svg>
</template>
<script>

    import altrexSvg from '@altrex-ui/icons';

    export default {
    name: 'AltrexIcon',
    props: {
        classOverride: {
            required: false,
            type: [String, Object, Array],
        },
        icon: {
            required: true,
            type: String,
        },
        size: {
            default: 'm', // Altrex icons default to 24px
            required: false,
            type: String,
        },
        spritePath: {
            default: null,
            type: String,
        },
    },
    computed: {
        className() {
            const className = [
                'altrex-icon',
                `altrex-icon--${this.size}`,
            ];
            return this.classOverride ? this.classOverride : className;
        },
        href() {
            if (this.spritePath) {
                return `${this.spritePath}#${this.icon}`;
            }
            return this.$altrexSVGPath ? `${this.$altrexSVGPath}#${this.icon}` : `${altrexSvg}#${this.icon}`;
        },
    },
};
</script>

<style lang="stylus">
    .altrex-icon--s {
        altrex-icon-s();
    }
    .altrex-icon--m {
        altrex-icon-m();
    }
    .altrex-icon--l {
        altrex-icon-l();
    }
    .altrex-icon--xl {
        altrex-icon-xl();
    }
    .altrex-icon--xxl {
        altrex-icon-xxl();
    }
</style>