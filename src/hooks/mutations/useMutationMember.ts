import { useMutation } from '@tanstack/react-query';
import { postMemberInfo } from '@/apis/members/member.api';
import { MemberInfoRequestBody } from '@/types/member';

const useMutationMember = () => {
  const postMemberMutation = useMutation({
    mutationFn: (data: { body: MemberInfoRequestBody }) => postMemberInfo(data.body),
  });

  return { postMemberMutation };
};

export default useMutationMember;
