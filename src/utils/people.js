export const ACTIVE_ROLES = ['professor', 'postdoc', 'phd', 'ms'];

export const ROLE_LABELS = {
    professor: 'Professor',
    postdoc: 'Postdoc',
    phd: 'PhD Student',
    ms: 'MS Student'
};

const ALUMNI_ROLE_LABELS = {
    professor: 'Professor',
    postdoc: 'Postdoc',
    phd: 'PhD',
    ms: 'MS'
};

export const organizePeople = data => {
    const all = data.people || [];
    const active = all.filter(person => person.status === 'active');
    const alumni = all.filter(person => person.status === 'alumni');
    const byRole = Object.fromEntries(
        ACTIVE_ROLES.map(role => [role, active.filter(person => person.role === role)])
    );

    return { active, alumni, byRole };
};

export const getRoleLabel = role => ROLE_LABELS[role] || role;

export const getAlumniNote = person => `(${ALUMNI_ROLE_LABELS[person.role] || person.role} ${person.year})`;
