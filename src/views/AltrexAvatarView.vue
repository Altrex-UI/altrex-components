<template>
    <div class="component-demo">
        <h1>Altrex Avatar Component</h1>
        <p class="intro">
            Avatars represent users or entities with images, initials, or icons. They support multiple sizes, shapes, and status indicators.
        </p>

        <!-- Sizes -->
        <section class="demo-section">
            <h2>Sizes</h2>
            <p class="description">
                Six size variants from extra small (24px) to 2xl (96px). Icon and text scale appropriately.
            </p>

            <div class="demo-group demo-group--aligned">
                <div class="demo-item">
                    <AltrexAvatar initials="XS" size="xs" />
                    <span class="demo-label">Extra Small (24px)</span>
                </div>
                <div class="demo-item">
                    <AltrexAvatar initials="S" size="s" />
                    <span class="demo-label">Small (32px)</span>
                </div>
                <div class="demo-item">
                    <AltrexAvatar initials="M" size="m" />
                    <span class="demo-label">Medium (40px)</span>
                </div>
                <div class="demo-item">
                    <AltrexAvatar initials="L" size="l" />
                    <span class="demo-label">Large (48px)</span>
                </div>
                <div class="demo-item">
                    <AltrexAvatar initials="XL" size="xl" />
                    <span class="demo-label">Extra Large (64px)</span>
                </div>
                <div class="demo-item">
                    <AltrexAvatar initials="2X" size="2xl" />
                    <span class="demo-label">2XL (96px)</span>
                </div>
            </div>
        </section>

        <!-- Shapes -->
        <section class="demo-section">
            <h2>Shapes</h2>
            <p class="description">
                Three shape variants: circle (default), square, and rounded square.
            </p>

            <div class="demo-group demo-group--aligned">
                <div class="demo-item">
                    <AltrexAvatar initials="JD" shape="circle" size="l" />
                    <span class="demo-label">Circle</span>
                </div>
                <div class="demo-item">
                    <AltrexAvatar initials="JD" shape="square" size="l" />
                    <span class="demo-label">Square</span>
                </div>
                <div class="demo-item">
                    <AltrexAvatar initials="JD" shape="rounded" size="l" />
                    <span class="demo-label">Rounded</span>
                </div>
            </div>
        </section>

        <!-- Variants (Colors) -->
        <section class="demo-section">
            <h2>Color Variants</h2>
            <p class="description">
                Multiple color variants for initials and icon avatars. Image avatars ignore variant.
            </p>

            <div class="demo-group demo-group--aligned">
                <div class="demo-item">
                    <AltrexAvatar initials="PR" variant="primary" size="l" />
                    <span class="demo-label">Primary</span>
                </div>
                <div class="demo-item">
                    <AltrexAvatar initials="SE" variant="secondary" size="l" />
                    <span class="demo-label">Secondary</span>
                </div>
                <div class="demo-item">
                    <AltrexAvatar initials="NE" variant="neutral" size="l" />
                    <span class="demo-label">Neutral</span>
                </div>
                <div class="demo-item">
                    <AltrexAvatar initials="SU" variant="success" size="l" />
                    <span class="demo-label">Success</span>
                </div>
                <div class="demo-item">
                    <AltrexAvatar initials="WA" variant="warning" size="l" />
                    <span class="demo-label">Warning</span>
                </div>
                <div class="demo-item">
                    <AltrexAvatar initials="ER" variant="error" size="l" />
                    <span class="demo-label">Error</span>
                </div>
            </div>
        </section>

        <!-- Content Types -->
        <section class="demo-section">
            <h2>Content Types</h2>
            <p class="description">
                Avatars can display images, initials, or icons. Falls back gracefully when image fails to load.
            </p>

            <div class="demo-group demo-group--aligned">
                <div class="demo-item">
                    <AltrexAvatar
                        src="https://i.pravatar.cc/150?img=1"
                        alt="User profile picture"
                        size="l"
                    />
                    <span class="demo-label">Image</span>
                </div>
                <div class="demo-item">
                    <AltrexAvatar initials="AB" size="l" />
                    <span class="demo-label">Initials</span>
                </div>
                <div class="demo-item">
                    <AltrexAvatar icon="generic-user" size="l" />
                    <span class="demo-label">Icon (default)</span>
                </div>
                <div class="demo-item">
                    <AltrexAvatar icon="generic-account" size="l" />
                    <span class="demo-label">Icon (account)</span>
                </div>
            </div>
        </section>

        <!-- Status Indicators -->
        <section class="demo-section">
            <h2>Status Indicators</h2>
            <p class="description">
                Use badge prop with status strings (online, offline, busy, away) for quick status dots.
            </p>

            <div class="demo-group demo-group--aligned">
                <div class="demo-item">
                    <AltrexAvatar
                        src="https://i.pravatar.cc/150?img=2"
                        badge="online"
                        size="l"
                    />
                    <span class="demo-label">Online</span>
                </div>
                <div class="demo-item">
                    <AltrexAvatar
                        src="https://i.pravatar.cc/150?img=3"
                        badge="offline"
                        size="l"
                    />
                    <span class="demo-label">Offline</span>
                </div>
                <div class="demo-item">
                    <AltrexAvatar
                        src="https://i.pravatar.cc/150?img=4"
                        badge="busy"
                        size="l"
                    />
                    <span class="demo-label">Busy</span>
                </div>
                <div class="demo-item">
                    <AltrexAvatar
                        src="https://i.pravatar.cc/150?img=5"
                        badge="away"
                        size="l"
                    />
                    <span class="demo-label">Away</span>
                </div>
            </div>
        </section>

        <!-- Badge Indicators -->
        <section class="demo-section">
            <h2>Badge Indicators (New)</h2>
            <p class="description">
                Enhanced badge support using AltrexBadge component. Supports dot badges, custom content, and full AltrexBadge props.
            </p>

            <div class="demo-group demo-group--aligned">
                <div class="demo-item">
                    <AltrexAvatar
                        src="https://i.pravatar.cc/150?img=20"
                        :badge="true"
                        size="l"
                    />
                    <span class="demo-label">Dot Badge (Boolean)</span>
                </div>
                <div class="demo-item">
                    <AltrexAvatar
                        src="https://i.pravatar.cc/150?img=21"
                        badge="3"
                        size="l"
                    />
                    <span class="demo-label">Content Badge (String)</span>
                </div>
                <div class="demo-item">
                    <AltrexAvatar
                        src="https://i.pravatar.cc/150?img=22"
                        :badge="{ dot: true, variant: 'success' }"
                        size="l"
                    />
                    <span class="demo-label">Dot (Success)</span>
                </div>
                <div class="demo-item">
                    <AltrexAvatar
                        src="https://i.pravatar.cc/150?img=23"
                        :badge="{ content: '!', variant: 'danger' }"
                        size="l"
                    />
                    <span class="demo-label">Alert Badge</span>
                </div>
                <div class="demo-item">
                    <AltrexAvatar
                        initials="VIP"
                        :badge="{ content: '★', variant: 'warning' }"
                        size="l"
                        variant="primary"
                    />
                    <span class="demo-label">VIP Badge</span>
                </div>
            </div>

            <h3>Badge Positions</h3>
            <p class="description">
                Control badge placement with the badgePosition prop.
            </p>

            <div class="demo-group demo-group--aligned">
                <div class="demo-item">
                    <AltrexAvatar
                        src="https://i.pravatar.cc/150?img=24"
                        badge="1"
                        badge-position="top-left"
                        size="l"
                    />
                    <span class="demo-label">Top Left</span>
                </div>
                <div class="demo-item">
                    <AltrexAvatar
                        src="https://i.pravatar.cc/150?img=25"
                        badge="2"
                        badge-position="top-right"
                        size="l"
                    />
                    <span class="demo-label">Top Right</span>
                </div>
                <div class="demo-item">
                    <AltrexAvatar
                        src="https://i.pravatar.cc/150?img=26"
                        badge="3"
                        badge-position="bottom-left"
                        size="l"
                    />
                    <span class="demo-label">Bottom Left</span>
                </div>
                <div class="demo-item">
                    <AltrexAvatar
                        src="https://i.pravatar.cc/150?img=27"
                        badge="4"
                        badge-position="bottom-right"
                        size="l"
                    />
                    <span class="demo-label">Bottom Right (Default)</span>
                </div>
            </div>

            <h3>Badge Sizes</h3>
            <p class="description">
                Control badge size with the badgeSize prop (s, m, l).
            </p>

            <div class="demo-group demo-group--aligned">
                <div class="demo-item">
                    <AltrexAvatar
                        src="https://i.pravatar.cc/150?img=29"
                        badge="online"
                        badge-size="s"
                        size="l"
                    />
                    <span class="demo-label">Small (s) - Default</span>
                </div>
                <div class="demo-item">
                    <AltrexAvatar
                        src="https://i.pravatar.cc/150?img=30"
                        badge="online"
                        badge-size="m"
                        size="l"
                    />
                    <span class="demo-label">Medium (m)</span>
                </div>
                <div class="demo-item">
                    <AltrexAvatar
                        src="https://i.pravatar.cc/150?img=31"
                        badge="online"
                        badge-size="l"
                        size="l"
                    />
                    <span class="demo-label">Large (l)</span>
                </div>
            </div>

            <h3>Badge Sizes with Content</h3>
            <div class="demo-group demo-group--aligned">
                <div class="demo-item">
                    <AltrexAvatar
                        src="https://i.pravatar.cc/150?img=34"
                        badge="5"
                        badge-size="s"
                        size="l"
                    />
                    <span class="demo-label">Small</span>
                </div>
                <div class="demo-item">
                    <AltrexAvatar
                        src="https://i.pravatar.cc/150?img=35"
                        badge="5"
                        badge-size="m"
                        size="l"
                    />
                    <span class="demo-label">Medium</span>
                </div>
                <div class="demo-item">
                    <AltrexAvatar
                        src="https://i.pravatar.cc/150?img=36"
                        badge="5"
                        badge-size="l"
                        size="l"
                    />
                    <span class="demo-label">Large</span>
                </div>
            </div>
        </section>

        <!-- Combinations -->
        <section class="demo-section">
            <h2>Combinations</h2>
            <p class="description">
                Badges work with all content types, sizes, and shapes.
            </p>

            <div class="demo-group demo-group--aligned">
                <div class="demo-item">
                    <AltrexAvatar
                        initials="JD"
                        badge="online"
                        size="xl"
                        variant="primary"
                    />
                    <span class="demo-label">Initials + Badge</span>
                </div>
                <div class="demo-item">
                    <AltrexAvatar
                        icon="generic-user"
                        badge="busy"
                        size="xl"
                        variant="secondary"
                        shape="rounded"
                    />
                    <span class="demo-label">Icon + Badge + Rounded</span>
                </div>
                <div class="demo-item">
                    <AltrexAvatar
                        src="https://i.pravatar.cc/150?img=6"
                        badge="away"
                        size="xl"
                        shape="square"
                    />
                    <span class="demo-label">Image + Badge + Square</span>
                </div>
            </div>
        </section>

        <!-- Use Cases -->
        <section class="demo-section">
            <h2>Use Cases</h2>

            <h3>User Profile</h3>
            <div class="demo-use-case">
                <div class="user-profile">
                    <AltrexAvatar
                        src="https://i.pravatar.cc/150?img=7"
                        badge="online"
                        size="xl"
                    />
                    <div class="user-info">
                        <h4>Jane Doe</h4>
                        <p>Product Designer</p>
                    </div>
                </div>
            </div>

            <h3>Comment Section</h3>
            <div class="demo-use-case">
                <div class="comment">
                    <AltrexAvatar
                        initials="AB"
                        variant="primary"
                        size="m"
                    />
                    <div class="comment-content">
                        <div class="comment-header">
                            <strong>Alex Brown</strong>
                            <span class="comment-time">2 hours ago</span>
                        </div>
                        <p>This looks great! The avatar component is very flexible.</p>
                    </div>
                </div>
            </div>

            <h3>Team Members List</h3>
            <div class="demo-use-case">
                <div class="team-list">
                    <div class="team-member">
                        <AltrexAvatar src="https://i.pravatar.cc/150?img=8" badge="online" size="m" />
                        <span>Sarah Chen</span>
                    </div>
                    <div class="team-member">
                        <AltrexAvatar initials="MJ" variant="secondary" badge="busy" size="m" />
                        <span>Michael Johnson</span>
                    </div>
                    <div class="team-member">
                        <AltrexAvatar src="https://i.pravatar.cc/150?img=9" badge="away" size="m" />
                        <span>Emily Rodriguez</span>
                    </div>
                    <div class="team-member">
                        <AltrexAvatar initials="DL" variant="success" badge="offline" size="m" />
                        <span>David Lee</span>
                    </div>
                </div>
            </div>

            <h3>Avatar Stack/Group</h3>
            <div class="demo-use-case">
                <div class="avatar-stack">
                    <AltrexAvatar src="https://i.pravatar.cc/150?img=10" size="m" />
                    <AltrexAvatar src="https://i.pravatar.cc/150?img=11" size="m" />
                    <AltrexAvatar src="https://i.pravatar.cc/150?img=12" size="m" />
                    <AltrexAvatar initials="+5" variant="neutral" size="m" />
                </div>
            </div>
        </section>

        <!-- Responsive Behavior -->
        <section class="demo-section">
            <h2>Responsive Sizing</h2>
            <p class="description">
                Avatars maintain their size across breakpoints. Adjust size prop based on context.
            </p>

            <div class="demo-group demo-group--aligned">
                <div class="demo-item">
                    <AltrexAvatar
                        src="https://i.pravatar.cc/150?img=13"
                        size="s"
                        badge="online"
                    />
                    <span class="demo-label">Mobile: Small</span>
                </div>
                <div class="demo-item">
                    <AltrexAvatar
                        src="https://i.pravatar.cc/150?img=14"
                        size="m"
                        badge="online"
                    />
                    <span class="demo-label">Tablet: Medium</span>
                </div>
                <div class="demo-item">
                    <AltrexAvatar
                        src="https://i.pravatar.cc/150?img=15"
                        size="l"
                        badge="online"
                    />
                    <span class="demo-label">Desktop: Large</span>
                </div>
            </div>
        </section>

        <!-- Accessibility -->
        <section class="demo-section">
            <h2>Accessibility</h2>
            <p class="description">
                Avatars include proper ARIA labels and alt text for screen readers.
            </p>

            <div class="demo-group demo-group--aligned">
                <div class="demo-item">
                    <AltrexAvatar
                        src="https://i.pravatar.cc/150?img=16"
                        alt="Profile picture of John Smith"
                        aria-label="John Smith, online"
                        badge="online"
                        size="l"
                    />
                    <span class="demo-label">With ARIA labels</span>
                </div>
            </div>
        </section>
    </div>
</template>

<script>
import AltrexAvatar from '@/components/Avatar/AltrexAvatar.vue';

export default {
    name: 'AltrexAvatarView',
    components: {
        AltrexAvatar,
    },
};
</script>

<style lang="stylus" scoped>
.component-demo {
    padding: $altrex-spacing-8;
    max-width: 1200px;
    margin: 0 auto;
}

h1 {
    font-size: $altrex-fontSize-3xl;
    font-weight: $altrex-fontWeight-bold;
    margin-bottom: $altrex-spacing-4;
    color: $altrex-colors-neutral-900;

    [data-theme="dark"] & {
        color: var(--altrex-colors-dark-text-primary);
    }
}

.intro {
    font-size: $altrex-fontSize-lg;
    color: $altrex-colors-neutral-700;
    margin-bottom: $altrex-spacing-8;
    line-height: $altrex-lineHeight-relaxed;

    [data-theme="dark"] & {
        color: var(--altrex-colors-dark-text-secondary);
    }
}

.demo-section {
    margin-bottom: $altrex-spacing-12;
}

h2 {
    font-size: $altrex-fontSize-2xl;
    font-weight: $altrex-fontWeight-semibold;
    margin-bottom: $altrex-spacing-3;
    color: $altrex-colors-neutral-900;

    [data-theme="dark"] & {
        color: var(--altrex-colors-dark-text-primary);
    }
}

h3 {
    font-size: $altrex-fontSize-xl;
    font-weight: $altrex-fontWeight-medium;
    margin-top: $altrex-spacing-6;
    margin-bottom: $altrex-spacing-3;
    color: $altrex-colors-neutral-800;

    [data-theme="dark"] & {
        color: var(--altrex-colors-dark-text-primary);
    }
}

.description {
    color: $altrex-colors-neutral-600;
    margin-bottom: $altrex-spacing-4;
    line-height: $altrex-lineHeight-relaxed;

    [data-theme="dark"] & {
        color: var(--altrex-colors-dark-text-secondary);
    }
}

.demo-group {
    display: flex;
    gap: $altrex-spacing-6;
    flex-wrap: wrap;
    padding: $altrex-spacing-6;
    background: $altrex-colors-neutral-50;
    border-radius: $altrex-borderRadius-lg;

    [data-theme="dark"] & {
        background: var(--altrex-colors-dark-bg-surface);
    }
}

.demo-group--aligned {
    align-items: flex-end;
}

.demo-item {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: $altrex-spacing-2;
}

.demo-label {
    font-size: $altrex-fontSize-sm;
    color: $altrex-colors-neutral-600;
    text-align: center;

    [data-theme="dark"] & {
        color: var(--altrex-colors-dark-text-secondary);
    }
}

.demo-use-case {
    margin-bottom: $altrex-spacing-6;
    padding: $altrex-spacing-6;
    background: $altrex-colors-neutral-50;
    border-radius: $altrex-borderRadius-lg;

    [data-theme="dark"] & {
        background: var(--altrex-colors-dark-bg-surface);
    }
}

// Use case styles
.user-profile {
    display: flex;
    align-items: center;
    gap: $altrex-spacing-4;
}

.user-info {
    h4 {
        margin: 0;
        font-size: $altrex-fontSize-lg;
        font-weight: $altrex-fontWeight-semibold;
        color: $altrex-colors-neutral-900;

        [data-theme="dark"] & {
            color: var(--altrex-colors-dark-text-primary);
        }
    }

    p {
        margin: $altrex-spacing-1 0 0;
        color: $altrex-colors-neutral-600;
        font-size: $altrex-fontSize-sm;

        [data-theme="dark"] & {
            color: var(--altrex-colors-dark-text-secondary);
        }
    }
}

.comment {
    display: flex;
    gap: $altrex-spacing-3;
}

.comment-content {
    flex: 1;
}

.comment-header {
    display: flex;
    align-items: center;
    gap: $altrex-spacing-2;
    margin-bottom: $altrex-spacing-2;

    strong {
        color: $altrex-colors-neutral-900;
        font-size: $altrex-fontSize-sm;

        [data-theme="dark"] & {
            color: var(--altrex-colors-dark-text-primary);
        }
    }
}

.comment-time {
    font-size: $altrex-fontSize-xs;
    color: $altrex-colors-neutral-500;

    [data-theme="dark"] & {
        color: var(--altrex-colors-dark-text-tertiary);
    }
}

.comment-content p {
    margin: 0;
    color: $altrex-colors-neutral-700;
    line-height: $altrex-lineHeight-relaxed;

    [data-theme="dark"] & {
        color: var(--altrex-colors-dark-text-secondary);
    }
}

.team-list {
    display: flex;
    flex-direction: column;
    gap: $altrex-spacing-3;
}

.team-member {
    display: flex;
    align-items: center;
    gap: $altrex-spacing-3;
    padding: $altrex-spacing-2;
    border-radius: $altrex-borderRadius-default;
    transition: background $altrex-transition-default;

    &:hover {
        background: $altrex-colors-neutral-100;

        [data-theme="dark"] & {
            background: var(--altrex-colors-dark-bg-hover);
        }
    }

    span {
        color: $altrex-colors-neutral-800;
        font-size: $altrex-fontSize-base;

        [data-theme="dark"] & {
            color: var(--altrex-colors-dark-text-primary);
        }
    }
}

.avatar-stack {
    display: flex;
    align-items: center;

    :deep(.altrex-avatar) {
        margin-left: -12px;
        border: 2px solid $altrex-colors-neutral-50;

        [data-theme="dark"] & {
            border-color: var(--altrex-colors-dark-bg-surface);
        }

        &:first-child {
            margin-left: 0;
        }
    }
}
</style>
