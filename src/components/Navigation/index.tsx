import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { ReactComponent as DashbordIcon } from './../../assets/navigation/dashbord.svg';
import { ReactComponent as AppoitmentIcon } from './../../assets/navigation/appointment.svg';
import { ReactComponent as AvaliabilityIcon } from './../../assets/navigation/availability.svg';
import { ReactComponent as PatientsIcon } from './../../assets/navigation/patients.svg';
import { ReactComponent as ProfileIcon } from './../../assets/navigation/profile.svg';
import { ReactComponent as HelpIcon } from './../../assets/navigation/help.svg';
import defaultUserPhoto from '../../assets/user/defaultUserPhoto.png';
import { Stack } from '@mui/material';
import {
  UserBlock,
  UserName,
  NavContainer,
  NavLinkStyled,
  NavItemContainer,
  NavItemContainerBlocked,
  NavBlock,
  UserPhoto,
  UserSpeciality,
  LanguageBlock
} from './styles';
import { useLocation } from 'react-router-dom';
import Logo from '../Logo';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import SignOut from '../Auth/SignOutButton';
import { setCurrentPage } from '../../redux/features/slices/navigationSlice';
import { selectCurrentPage } from '../../redux/features/selectors/navigationSelector';
import { PATH } from '../../constants/routes';
import { roles, useSpecializations } from '../../constants/mockData';
import { selectUser } from '../../redux/features/selectors/userSelector';
import LanguageSwitcher from '../LanguageSwitcher';

interface INavigation {
  label: string;
  to: string;
  icon: React.FunctionComponent<React.SVGProps<SVGSVGElement>>;
}

const Navigation = () => {
  const { t } = useTranslation();

  const specializations = useSpecializations();

  const user = useAppSelector(selectUser);

  const dispatch = useAppDispatch();

  const selectedPage = useAppSelector(selectCurrentPage);

  const location = useLocation();

  const handleSelected = (navItem: INavigation) => {
    dispatch(setCurrentPage(navItem.to));
  };

  const getUserSpecialization = React.useMemo(() => {
    const userSpecialization = specializations.find(
      (spec) => spec.value === user?.specialization
    );
    return userSpecialization ? userSpecialization.label : '';
  }, [specializations, user?.specialization]);

  const navItems: INavigation[] = React.useMemo(
    () => [
      ...(user?.role === roles.doctor
        ? [
            {
              label: 'Navigation.dashboard',
              to: PATH.DASHBOARD,
              icon: DashbordIcon
            },
            {
              label: 'Navigation.appointments',
              to: PATH.APPOINTMENTS,
              icon: AppoitmentIcon
            },
            {
              label: 'Navigation.availability',
              to: PATH.AVAILABILITY,
              icon: AvaliabilityIcon
            }
          ]
        : []),
      { label: 'Navigation.patients', to: PATH.PATIENTS, icon: PatientsIcon },
      { label: 'Navigation.profile', to: PATH.PROFILE, icon: ProfileIcon },
      { label: 'Navigation.help', to: PATH.HELP, icon: HelpIcon }
    ],
    [user?.role]
  );

  useEffect(() => {
    const navItem = navItems.find((item) =>
      location.pathname.startsWith(item.to)
    );
    if (navItem) {
      dispatch(setCurrentPage(navItem.to));
    }
  }, [dispatch, location.pathname, navItems]);

  return (
    <NavContainer>
      <NavBlock>
        <Logo />
        {navItems.map((obj) => (
          <div key={obj.to}>
            {true ? (
              <NavLinkStyled to={obj.to}>
                <NavItemContainer
                  key={obj.label}
                  onClick={() => handleSelected(obj)}
                  selected={selectedPage === obj.to}
                >
                  <obj.icon />
                  {t(obj.label)}
                </NavItemContainer>
              </NavLinkStyled>
            ) : (
              <div>
                <NavItemContainerBlocked key={obj.label}>
                  <obj.icon />
                  {t(obj.label)}
                </NavItemContainerBlocked>
              </div>
            )}
          </div>
        ))}
        <SignOut />
      </NavBlock>
      <UserBlock>
        <UserPhoto src={user?.photoUrl ? user.photoUrl : defaultUserPhoto} />
        <Stack>
          <UserName>
            {user?.firstName} {user?.lastName}
          </UserName>
          <UserSpeciality>{getUserSpecialization}</UserSpeciality>
        </Stack>
      </UserBlock>
      <LanguageBlock>
        <LanguageSwitcher />
      </LanguageBlock>
    </NavContainer>
  );
};

export default Navigation;
