// import { getUserData } from '@/utils/utility';
import { defineAbilityFor } from '@/utils/defineAbilityFor';

// const userData = getUserData();
// const userRole = userData ? userData.role : null;
const userRole = 'admin';

export default defineAbilityFor(userRole || '');
