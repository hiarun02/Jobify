import {useSelector} from "react-redux";
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
  TableCell,
} from "./ui/table";

export const AppliedJobTable = () => {
  const {appliedJobs} = useSelector((store) => store.jobs);
  if (!appliedJobs || appliedJobs.length === 0) {
    return (
      <span className="text-lg flex justify-center">
        You haven't applied to any jobs yet
      </span>
    );
  }
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Company</TableHead>
          <TableHead>Role</TableHead>
          <TableHead>Date</TableHead>
          <TableHead>status</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {appliedJobs.map((application) => (
          <TableRow key={application._id}>
            <TableCell> {application?.job?.company?.name}</TableCell>
            <TableCell> {application?.job?.title}</TableCell>
            <TableCell>{application?.createdAt?.split("T")[0]}</TableCell>
            <TableCell> {application?.status}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};
