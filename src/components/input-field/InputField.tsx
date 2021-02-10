import AutoComplete from '@material-ui/lab/Autocomplete';
import TextField from '@material-ui/core/TextField';
import './input-field.scss';
import CircularProgress from '@material-ui/core/CircularProgress';

const InputField = ({
  placeholder,
  cnpjs,
  className,
  isLoading = false,
  setCnpj,
  cnpj,
}: {
  placeholder?: string;
  cnpjs?: string[];
  className?: string;
  isLoading?: boolean;
  cnpj: string;
  setCnpj: (cnpj: string) => void;
}) => {
  return (
    <AutoComplete
      className={className}
      loading={isLoading}
      options={cnpjs || []}
      value={cnpj}
      onChange={(_, value) => setCnpj(value || '')}
      getOptionLabel={(option) => option}
      renderInput={(params) => (
        <TextField
          label={placeholder}
          {...params}
          variant="outlined"
          onChange={(e) => setCnpj(e.currentTarget.value)}
          InputProps={{
            ...params.InputProps,
            endAdornment: (
              <>
                {isLoading ? (
                  <CircularProgress
                    className="input-field__progress"
                    color="inherit"
                    size={20}
                  />
                ) : null}
                {params.InputProps.endAdornment}
              </>
            ),
          }}
        />
      )}
    />
  );
};

export default InputField;
